import { IResourceResponse } from "../utils/types";

interface IProps {
  resourceData: IResourceResponse;
}

export default function LikeResource({ resourceData }: IProps): JSX.Element {
  const { num_likes, num_dislikes } = resourceData;

  return (
    <>
      <button type="button">Like</button>
      <p>{num_likes}</p>
      <button type="button">Dislike</button>
      <p>{num_dislikes}</p>
    </>
  );
}
