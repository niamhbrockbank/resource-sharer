import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { IResourceRequest } from "../utils/types";

const templateResourceRequest = {
  resource_name: "",
  author_name: "",
  url: "",
  description: "",
  content_type: "",
  build_stage: "",
  opinion: "",
  opinion_reason: "",
  user_id: NaN,
};

export default function CreateNewResource(): JSX.Element {
  const [show, setShow] = useState(false);
  const [newResourceData, setNewResourceData] = useState<IResourceRequest>(
    templateResourceRequest
  );
  const {
    resource_name,
    url,
    author_name,
    content_type,
    opinion,
    opinion_reason,
    build_stage,
    description,
  } = newResourceData;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Resource
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={resource_name}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                resource_name: e.target.value,
              })
            }
          />
          <input
            value={author_name}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                author_name: e.target.value,
              })
            }
          />
          <input
            value={url}
            onChange={(e) =>
              setNewResourceData({ ...newResourceData, url: e.target.value })
            }
          />
          <input
            value={content_type}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                content_type: e.target.value,
              })
            }
          />
          <input
            value={description}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                description: e.target.value,
              })
            }
          />
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
    </>
  );
}
