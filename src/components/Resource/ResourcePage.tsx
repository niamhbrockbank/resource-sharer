import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { IResourceResponse, IUserResponse } from "../../utils/types";
import Comments from "./Comments";
import Likes from "./Likes";
import "./Resource.scss";

interface IProps {
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  currentUser: IUserResponse | undefined;
}

//TODO: Migrate functionality from Resource.tsx and rename to Resource
//TODO: Only fetch all the data for the resources that you click on to the full page of
//TODO: Only pass the data from the resource you're looking at, rather than the whole resourceList
export default function ResourcePage({
  resourceList,
  setResourceList,
  currentUser,
}: IProps): JSX.Element {
  const { id } = useParams();
  const errorMessage = "Sorry, that resource can't be found";
  const navigate = useNavigate();

  async function handleDelete(resource_id: number): Promise<void> {
    await axios.delete(`${baseUrl}/resources/${resource_id}`);
    getResourcesFromServer(setResourceList);

    navigate("/");
  }

  if (id) {
    const resource = resourceList.find(
      (res) => res.resource_id === parseInt(id)
    );

    if (!resource) {
      return <h1>{errorMessage}</h1>;
    }

    const {
      resource_id,
      resource_name,
      author_name,
      url,
      description,
      opinion_reason,
      user_name,
      tag_array,
      user_id,
    } = resource;

    return (
      <div id="resource_page">
        <div id="resource">
          <h1>{resource_name}</h1>
          <p>by {author_name}</p>
          <div className="link">
            <img src="/img/link.svg" alt="link icon" />
            <a href={url}>{url.slice(0, 50)}</a>
          </div>

          <p>{description}</p>

          <p>
            {user_name}'s notes: {opinion_reason}
          </p>
          <div className="tag_cloud">
            {tag_array.length > 0 &&
              tag_array.map((tag, i) => (
                <div className="tag" key={i}>
                  {tag}
                </div>
              ))}
          </div>

          <Likes
            currentUser={currentUser}
            resourceData={resource}
            setResourceList={setResourceList}
          />

          {/* If the user signed in is the one that added the resource */}
          {currentUser?.user_id === user_id && (
            <>
              {/* TODO: Add functionality to edit button */}
              <button>Edit</button>
              <button onClick={() => handleDelete(resource_id)}>Delete</button>
            </>
          )}

          <Comments
            resource_id={resource_id}
            currentUserId={currentUser?.user_id}
          />
        </div>
      </div>
    );
  } else {
    return <h1>{errorMessage}</h1>;
  }
}