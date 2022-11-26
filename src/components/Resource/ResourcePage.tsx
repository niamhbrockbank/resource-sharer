import { useParams } from "react-router-dom";
import { IResourceResponse } from "../../utils/types";

interface IProps {
  resourceList: IResourceResponse[];
}

//TODO: Migrate functionality from Resource.tsx and rename to Resource
//TODO: Only fetch all the data for the resources that you click on to the full page of
//TODO: Only pass the data from the resource you're looking at, rather than the whole resourceList
export default function ResourcePage({ resourceList }: IProps): JSX.Element {
  const { id } = useParams();
  const errorMessage = "Sorry, that resource can't be found"

  if (id) {
    const resource = resourceList.find(
      (res) => res.resource_id === parseInt(id)
    );
    
    if (!resource) {
        return <h1>{errorMessage}</h1>
    }

    const {
      resource_name,
      author_name,
      url,
      time_date,
      description,
      build_stage,
      opinion_reason,
      user_name,
      tag_array
    } = resource;

    return (
      <>
        <h1>{resource_name}</h1>
        <p>You've made it to {id}</p>
        <p>
          {author_name}
          {url}
          {time_date}
        </p>
        <h4>{build_stage}</h4>
        <p>{description}</p>
        <h4>{user_name}'s notes:</h4>
        <p>{opinion_reason}</p>

        <div className="tag_cloud">
        Tags
        {tag_array.length > 0 &&
          tag_array.map((tag, i) => (
            <button className="tag" key={i}>
              {tag}
            </button>
          ))}
      </div>
      </>
    );
  } else {
    return <h1>{errorMessage}</h1>;
  }
}
