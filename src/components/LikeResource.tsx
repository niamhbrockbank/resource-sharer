import { useEffect, useState } from "react";
import { handleLikeButtons } from "../utils/likeButtons";
import { userHasLikedOrDisliked } from "../utils/userHasLikedOrDisliked";
import { IResourceResponse } from "../utils/types";
import { IUserResponse } from "../utils/types";

interface IProps {
  currentUser: IUserResponse | undefined;
  resourceData: IResourceResponse;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function LikeResource({
  currentUser,
  resourceData,
  setResourceList,
}: IProps): JSX.Element {
  const {
    user_id,
    resource_id,
    num_likes,
    num_dislikes,
    liking_users_array,
    disliking_users_array,
  } = resourceData;

  const [likedStatus, setLikedStatus] = useState<
    "has liked" | "has disliked" | null
  >(null);

  useEffect(() => {
    if (userHasLikedOrDisliked(currentUser, liking_users_array)) {
      setLikedStatus("has liked");
    } else if (userHasLikedOrDisliked(currentUser, disliking_users_array)) {
      setLikedStatus("has disliked");
    } else {
      setLikedStatus(null);
    }
  }, [currentUser, liking_users_array, disliking_users_array]);

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
