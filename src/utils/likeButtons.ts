import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getLikedResourcesFromServer } from "./getLikedResourcesFromServer";
import getResourcesFromServer from "./getResourcesFromServer";
import { ILikedResourcesResponse, IResourceResponse } from "./types";

export async function handleLikeButtons(
  like_or_dislike: string,
  resource_id: number,
  user_id: number | undefined,
  resourcesLikedByUser: ILikedResourcesResponse | null,
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >,
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>
): Promise<void> {
  const isUnliking: boolean =
    like_or_dislike === "like" &&
    userHasLiked(resource_id, resourcesLikedByUser);

  const isUndisliking: boolean =
    like_or_dislike === "dislike" &&
    userHasDisliked(resource_id, resourcesLikedByUser);

  console.log(resourcesLikedByUser);

  if (user_id === undefined) {
    return;
  }

  if (isUnliking || isUndisliking) {
    try {
      await axios.delete(
        baseUrl + `/resources/${resource_id}/${user_id}/likes`
      );
      await getResourcesFromServer(setResourceList);
      await getLikedResourcesFromServer(user_id, setResourcesLikedByUser);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  try {
    axios.post(baseUrl + `/resources/${resource_id}/likes`, {
      user_id: user_id,
      like_or_dislike: like_or_dislike,
    });
    await getResourcesFromServer(setResourceList);
    await getLikedResourcesFromServer(user_id, setResourcesLikedByUser);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

export function userHasLiked(
  resource_id: number,
  resourcesLikedByUser: ILikedResourcesResponse | null
): boolean {
  if (resourcesLikedByUser === null) {
    return false;
  } else if (resourcesLikedByUser.liked_resources === null) {
    return false;
  }
  return resourcesLikedByUser.liked_resources.includes(resource_id);
}

export function userHasDisliked(
  resource_id: number,
  resourcesLikedByUser: ILikedResourcesResponse | null
): boolean {
  if (resourcesLikedByUser === null) {
    return false;
  } else if (resourcesLikedByUser.disliked_resources === null) {
    return false;
  }
  return resourcesLikedByUser.disliked_resources.includes(resource_id);
}
