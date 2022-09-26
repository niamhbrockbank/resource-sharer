import { IResourceResponse } from "../utils/types";
import ResourceHeader from "./ResourceHeader";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Comments from "./Comments";

interface IProps {
  resourceData: IResourceResponse;
}

export default function IndividualResource({
  resourceData,
}: IProps): JSX.Element {
  const [showResource, setShowResource] = useState(false);

  const handleClose = () => setShowResource(false);
  const { description, build_stage, opinion_reason, user_id, resource_id } =
    resourceData;

  async function addToStudyList(): Promise<void> {
    await axios.post(`${baseUrl}/users/3/study_list`, {
      resource_id: resource_id,
    }); //Replace 3 with ${userId} when we have a userId state
  }

  return (
    <div>
      <ResourceHeader
        setShowResource={setShowResource}
        resourceData={resourceData}
      />
      {/* <button>Add to study list</button> */}
      {/* <Likes /> */}
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
          <h4>{user_id}'s notes:</h4>
          <p>{opinion_reason}</p>
          <button onClick={addToStudyList}>Add to study list</button>
          <h3>Comments:</h3>
          <Comments resource_id={resource_id} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
