import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getLikedResourcesFromServer(
  user_id: number | undefined,
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<{
      liked_resources: number[] | null;
      disliked_resources: number[] | null;
    } | null>
  >
): Promise<void> {
  if (user_id === undefined) {
    return;
  }
  try {
    const likedResources = await axios.get(baseUrl + `/users/${user_id}/likes`);
    setResourcesLikedByUser(likedResources.data);
  } catch (error) {
    console.error(error);
    return;
  }
}
