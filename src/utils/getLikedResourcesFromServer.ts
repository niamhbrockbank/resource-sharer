import axios from "axios";
import { IUserResponse } from "../App";
import { baseUrl } from "./baseUrl";
import { ILikedResourcesResponse } from "./types";

export async function getLikedResourcesFromServer(
  currentUser: IUserResponse | undefined,
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >
): Promise<void> {
  if (currentUser === undefined) {
    return;
  }

  try {
    const likedResources = await axios.get(
      baseUrl + `/users/${currentUser.user_id}/likes`
    );
    setResourcesLikedByUser(likedResources.data[0]);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
