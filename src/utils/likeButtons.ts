import axios from "axios";
import { IUserResponse } from "../App";
import { baseUrl } from "./baseUrl";
import { getLikedResourcesFromServer } from "./getLikedResourcesFromServer";
import getResourcesFromServer from "./getResourcesFromServer";
import { ILikedResourcesResponse, IResourceResponse } from "./types";

export async function handleLikeButtons(
  like_or_dislike: string,
  likedStatus: "has liked" | "has disliked" | null,
  resource_id: number,
  currentUser: IUserResponse | undefined,
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >,
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>
): Promise<void> {
  const isDeletingLike: boolean =
    like_or_dislike === "like" && likedStatus === "has liked";

  const isDeletingDislike: boolean =
    like_or_dislike === "dislike" && likedStatus === "has disliked";

  if (currentUser === undefined) {
    return;
  }

  if (isDeletingLike || isDeletingDislike) {
    try {
      await axios.delete(
        baseUrl + `/resources/${resource_id}/${currentUser.user_id}/likes`
      );

      await getLikedResourcesFromServer(currentUser, setResourcesLikedByUser);
      await getResourcesFromServer(setResourceList);

      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  try {
    axios.post(baseUrl + `/resources/${resource_id}/likes`, {
      user_id: currentUser.user_id,
      like_or_dislike: like_or_dislike,
    });

    await getLikedResourcesFromServer(currentUser, setResourcesLikedByUser);
    await getResourcesFromServer(setResourceList);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
