import moment from "moment";
import { Card } from "react-bootstrap";
import { IResourceResponse } from "../../utils/types";
import LikeResource from "./LikeResource";

interface IProps {
  resourceData: IResourceResponse;
  setShowResource: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResourceCard({
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
    <div className='resource_card' onClick={() => setShowResource(true)}>
      <Card.Title>{resource_name}</Card.Title>
      <Card.Subtitle>Added by: {user_name}</Card.Subtitle>
      <Card.Text>
        Author: {author_name}
        <br />
        Content type: {content_type}
        <br />
        {opinion}
        <br />
        <Card.Link href={url}>{url}</Card.Link>
        <br />
        Date created: {moment(time_date).format("Do MMM YYYY")}
      </Card.Text>
    </div>
  );
}
