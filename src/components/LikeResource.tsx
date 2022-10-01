import { useEffect, useState } from "react";
import { handleLikeButtons } from "../utils/likeButtons";
import { userHasLiked, userHasDisliked } from "../utils/userHasLikedOrDisliked";
import { ILikedResourcesResponse, IResourceResponse } from "../utils/types";
import { IUserResponse } from "../App";

interface IProps {
  currentUser: IUserResponse | undefined;
  resourceData: IResourceResponse;
  resourcesLikedByUser: ILikedResourcesResponse | null;
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function LikeResource({
  currentUser,
  resourceData,
  resourcesLikedByUser,
  setResourcesLikedByUser,
  setResourceList,
}: IProps): JSX.Element {
  const { user_id, resource_id, num_likes, num_dislikes } = resourceData;

  const [likedStatus, setLikedStatus] = useState<
    "has liked" | "has disliked" | null
  >(null);

  useEffect(() => {
    if (userHasLiked(resource_id, resourcesLikedByUser)) {
      setLikedStatus("has liked");
    } else if (userHasDisliked(resource_id, resourcesLikedByUser)) {
      setLikedStatus("has disliked");
    } else {
      setLikedStatus(null);
    }
  }, [resourcesLikedByUser, resource_id]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          handleLikeButtons(
            "like",
            likedStatus,
            resource_id,
            currentUser,
            setResourcesLikedByUser,
            setResourceList
          )
        }
        disabled={user_id === undefined}
        style={{
          backgroundColor: likedStatus === "has liked" ? "green" : "grey",
        }}
      >
        👍
      </button>
      <p>{num_likes}</p>
      <button
        type="button"
        onClick={() =>
          handleLikeButtons(
            "dislike",
            likedStatus,
            resource_id,
            currentUser,
            setResourcesLikedByUser,
            setResourceList
          )
        }
        disabled={user_id === undefined}
        style={{
          backgroundColor: likedStatus === "has disliked" ? "red" : "grey",
        }}
      >
        👎
      </button>
      <p>{num_dislikes}</p>
    </>
  );
}
