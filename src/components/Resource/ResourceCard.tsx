import moment from "moment";
import { IResourceResponse } from "../../utils/types";

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
    <div className="resource_card" onClick={() => setShowResource(true)}>
      <h2>{resource_name}</h2>
      <p>by {author_name}</p>
      <img
        className="link"
        src="./img/link.svg"
        onClick={() => window.open(url, "_blank")}
        alt="link to resource"
      />
      <p>{content_type}</p>
      {/* TODO: Convert this to a traffic light system */}
      <p>{opinion}</p>
      <div className="added_details">
        <p>added by {user_name}</p>
        <p>created {moment(time_date).format("Do MMM YYYY")}</p>
      </div>
    </div>
  );
}
