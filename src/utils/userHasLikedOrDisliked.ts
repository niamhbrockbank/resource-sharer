import { ILikedResourcesResponse } from "./types";

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
