import axios from "axios";
import { baseUrl } from "./baseUrl";
import { ILikedResourcesResponse } from "./types";

export async function getLikedResourcesFromServer(
  user_id: number | undefined,
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >
): Promise<void> {
  console.log(user_id);
  if (user_id === undefined) {
    return;
  }
  try {
    const likedResources = await axios.get(baseUrl + `/users/${user_id}/likes`);
    setResourcesLikedByUser(likedResources.data[0]);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
