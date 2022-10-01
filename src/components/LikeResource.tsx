import {
  handleLikeButtons,
  userHasDisliked,
  userHasLiked,
} from "../utils/likeButtons";
import { ILikedResourcesResponse, IResourceResponse } from "../utils/types";

interface IProps {
  resourceData: IResourceResponse;
  resourcesLikedByUser: ILikedResourcesResponse | null;
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function LikeResource({
  resourceData,
  resourcesLikedByUser,
  setResourcesLikedByUser,
  setResourceList,
}: IProps): JSX.Element {
  const { user_id, resource_id, num_likes, num_dislikes } = resourceData;

  return (
    <>
      <button
        type="button"
        onClick={() =>
          handleLikeButtons(
            "like",
            resource_id,
            user_id,
            resourcesLikedByUser,
            setResourcesLikedByUser,
            setResourceList
          )
        }
        disabled={user_id === undefined}
      >
        {userHasLiked(resource_id, resourcesLikedByUser) ? (
          <h1>👍</h1>
        ) : (
          <p>👍</p>
        )}
      </button>
      <p>{num_likes}</p>
      <button
        type="button"
        onClick={() =>
          handleLikeButtons(
            "dislike",
            resource_id,
            user_id,
            resourcesLikedByUser,
            setResourcesLikedByUser,
            setResourceList
          )
        }
        disabled={user_id === undefined}
      >
        {userHasDisliked(resource_id, resourcesLikedByUser) ? (
          <h1>👎</h1>
        ) : (
          <p>👎</p>
        )}
      </button>
      <p>{num_dislikes}</p>
    </>
  );
}
