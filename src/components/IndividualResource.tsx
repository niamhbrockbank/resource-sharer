import { IResourceResponse } from "../utils/types";
import ResourceHeader from "./ResourceHeader";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Comments from "./Comments";
import { IUserResponse } from "../App";
import LikeResource from "./LikeResource";

interface IProps {
  resourceData: IResourceResponse;
  currentUser: IUserResponse | undefined;
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function IndividualResource({
  resourceData,
  currentUser,
  setResourceList,
}: IProps): JSX.Element {
  const [showResource, setShowResource] = useState(false);

  const handleClose = () => setShowResource(false);
  const {
    description,
    build_stage,
    opinion_reason,
    user_name,
    resource_id,
    tag_array,
  } = resourceData;

  async function addToStudyList(): Promise<void> {
    if (currentUser === undefined) {
      return;
    }
    await axios.post(`${baseUrl}/users/${currentUser.user_id}/study_list`, {
      resource_id: resource_id,
    });
  }

  return (
    <div>
      <ResourceHeader
        setShowResource={setShowResource}
        resourceData={resourceData}
      />
      {/* <button>Add to study list</button> */}
      <LikeResource
        currentUser={currentUser}
        resourceData={resourceData}
        setResourceList={setResourceList}
      />
      <Modal show={showResource} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResourceHeader
            setShowResource={setShowResource}
            resourceData={resourceData}
          />
          <h4>{build_stage}</h4>
          <p>{description}</p>
          <h4>{user_name}'s notes:</h4>
          <p>{opinion_reason}</p>
          <LikeResource
            currentUser={currentUser}
            resourceData={resourceData}
            setResourceList={setResourceList}
          />
          <div className="tag-cloud">
            Tags:
            {tag_array.map((tag, i) => (
              <button key={i}>{tag}</button>
            ))}
          </div>
          <button onClick={addToStudyList} disabled={currentUser === undefined}>
            Add to study list
          </button>
          <h3>Comments:</h3>
          <Comments
            resource_id={resource_id}
            currentUserId={currentUser?.user_id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
