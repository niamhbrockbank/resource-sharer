import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import getStudylistFromServer from "../../utils/getStudylistFromServer";
import { IResourceResponse, IUserResponse } from "../../utils/types";
import Comments from "./Comments";
// import Likes from "./Likes";
import "./Resource.scss";

interface IProps {
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  currentUser: IUserResponse | undefined;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

//TODO: Only fetch all the data for the resources that you click on to the full page of
export default function Resource({
  setResourceList,
  currentUser,
  userStudylist,
  setUserStudylist,
}: IProps): JSX.Element {
  const { id } = useParams();
  //TODO: Add placeholder into resource state for initial render
  const [resource, setResource] = useState<IResourceResponse>();
  const navigate = useNavigate();
  const errorMessage = "Sorry, that resource can't be found";

  useEffect(() => {
    async function getResourceFromServer(): Promise<void> {
      try {
        const response = await axios.get(`${baseUrl}/resources/${id}`);
        const currentResource: IResourceResponse = response.data[0];
        setResource(currentResource);
      } catch (error) {
        console.error(error);
      }
    }

    getResourceFromServer();
  }, [id]);

  async function handleDelete(): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/resources/${id}`);
      getResourcesFromServer(setResourceList);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("There was a problem deleting. Try again later.");
    }
  }

  async function addToStudyList(resource_id: number): Promise<void> {
    if (currentUser === undefined) {
      return;
    }
    await axios.post(`${baseUrl}/users/${currentUser.user_id}/study_list`, {
      resource_id: resource_id,
    });
    await getStudylistFromServer(currentUser.user_id, setUserStudylist);
  }

  async function removeFromStudyList(resource_id: number): Promise<void> {
    if (currentUser !== undefined) {
      await axios.delete(`${baseUrl}/users/${currentUser.user_id}/study_list`, {
        data: { resource_id: resource_id },
      });
      await getStudylistFromServer(currentUser.user_id, setUserStudylist);
    }
  }

  if (!resource) {
    return <h1>{errorMessage}</h1>;
  }

  const {
    resource_id,
    resource_name,
    author_name,
    url,
    description,
    notes,
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
          <a href={url}>{url && url.slice(0, 50)}</a>
        </div>

        <p>{description}</p>

        <p>
          {user_name}'s notes: {notes}
        </p>
        <div className="tag_cloud">
          {tag_array &&
            tag_array.length > 0 &&
            tag_array.map((tag, i) => (
              <div className="tag" key={i}>
                {tag}
              </div>
            ))}
        </div>

        {/* <Likes
          currentUser={currentUser}
          resourceData={resource}
          setResourceList={setResourceList}
        /> */}

        {/* If the user signed in is the one that added the resource */}
        {currentUser?.user_id === user_id && (
          <>
            {/* TODO: Add functionality to edit button */}
            <button onClick={() => navigate(`/resource/${id}/edit`)}>
              Edit
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}

        <Comments resource_id={resource_id} currentUser={currentUser} />

        {currentUser === undefined ? (
          <button onClick={() => navigate("/signin")}>
            Sign in to add to study list
          </button>
        ) : (
          <>
            {userStudylist && userStudylist.includes(resource_id) ? (
              <button onClick={() => removeFromStudyList(resource_id)}>
                Remove from study list
              </button>
            ) : (
              <button onClick={() => addToStudyList(resource_id)}>
                Add to study list
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
