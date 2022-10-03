import { IResourceResponse } from "../utils/types";
import ResourceHeader from "./ResourceHeader";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Comments from "./Comments";
import { IUserResponse } from "../App";
import LikeResource from "./LikeResource";
import getStudylistFromServer from "../utils/getStudylistFromServer";

interface IProps {
  resourceData: IResourceResponse;
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export default function IndividualResource({
  resourceData,
  currentUserManager,
  userStudylist,
  setUserStudylist,
}: IProps): JSX.Element {
  const [showResource, setShowResource] = useState(false);
  const currentUser = currentUserManager[0];
  const currentUserId = currentUser ? currentUser.user_id : undefined;

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
    await axios.post(`${baseUrl}/users/${currentUserId}/study_list`, {
      resource_id: resource_id,
    });
    await getStudylistFromServer(currentUserId, setUserStudylist);
  }

  async function removeFromStudyList(): Promise<void> {
    await axios.delete(`${baseUrl}/users/${currentUserId}/study-list`, {
      data: { resource_id: resource_id },
    });
    await getStudylistFromServer(currentUserId, setUserStudylist);
  }

  return (
    <div>
      <ResourceHeader
        setShowResource={setShowResource}
        resourceData={resourceData}
      />
      {/* <button>Add to study list</button> */}
      <LikeResource resourceData={resourceData} />
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
          <LikeResource resourceData={resourceData} />
          <div className="tag-cloud">
            Tags:
            {tag_array.map((tag, i) => (
              <button key={i}>{tag}</button>
            ))}
          </div>
          {userStudylist && userStudylist.includes(resource_id) ? (
            <button onClick={removeFromStudyList}>
              Remove from study list
            </button>
          ) : (
            <button
              onClick={addToStudyList}
              disabled={currentUser === undefined}
            >
              Add to study list
            </button>
          )}

          <h3>Comments:</h3>
          <Comments resource_id={resource_id} currentUserId={currentUserId} />
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
