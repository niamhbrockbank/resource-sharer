import moment from "moment";
import { IResourceResponse } from "../utils/types";

interface IProps {
  resourceData: IResourceResponse;
  setShowResource: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResourceHeader({
  resourceData,
  setShowResource,
}: IProps): JSX.Element {
  const {
    resource_name,
    author_name,
    user_name,
    content_type,
    url,
    time_date,
    opinion,
  } = resourceData;

  return (
    <div onClick={() => setShowResource(true)}>
      <h1>{resource_name}</h1>
      <p>Author: {author_name}</p>
      <p>Added by: {user_name}</p>
      <p>Content type: {content_type}</p>
      <p>{url}</p>
      <p>Date created: {moment(time_date).format("Do MMM YYYY")}</p>
      <p>{opinion}</p>
    </div>
  );
}
