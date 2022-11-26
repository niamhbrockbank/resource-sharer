import moment from "moment";
import selectRandElement from "../../utils/selectRandElement";
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
    url,
    time_date,
  } = resourceData;

  //TODO: Set this as a property of the resource when fetching so doesnt change on refresh page
  const backgroundImage = selectRandElement(['semi_circles.png', 'rects.png', 'two_curved_rects.png', 'circles.png'])

  return (
    <div className="resource_card" onClick={() => setShowResource(true)}
      style={{backgroundImage : `url(/img/${backgroundImage})`}}
    > 
    <div className='card_details'>
      <h2><img
        className="link"
        src="./img/link.svg"
        onClick={() => window.open(url, "_blank")}
        alt="link to resource"
      />{resource_name}</h2>
      <p>by {author_name}</p> 
      
      {/* TODO: Convert this to a traffic light system */}
      {/* <p>{opinion}</p> */}
      <div className="added_details">
        <p>{user_name}</p>
        <p>created {moment(time_date).format("Do MMM YYYY")}</p>
      </div>
      </div> 
    </div>
  );
}
