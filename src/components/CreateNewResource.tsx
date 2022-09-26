import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IResourceRequest } from "../utils/types";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import axios from "axios";

const templateResourceRequest = {
  resource_name: "",
  author_name: "",
  url: "",
  description: "",
  content_type: "",
  build_stage: "",
  opinion: "",
  opinion_reason: "",
  user_id: 2,
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
    opinion_reason,
    description,
  } = newResourceData;
  const [tags, setTags] = useState<{ tag_name: string }[]>([]);

  const [opinions, setOpinions] = useState<{ opinion: string }[]>([]);
  const [stageNames, setStageNames] = useState<{ stage_name: string }[]>([]);

  const dbURL = "http://localhost:4000";

  useEffect(() => {
    const getOptions = async () => {
      try {
        const opinionsResponse = await axios.get(dbURL + "/opinions");
        setOpinions(opinionsResponse.data);

        const stageNamesResponse = await axios.get(dbURL + "/stage_names");
        setStageNames(stageNamesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOptions();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    try {
      axios.post(dbURL + "/resources", {
        ...newResourceData,
        tag_array: tags,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

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
          <label htmlFor="resource-name-input">resource name: </label>
          <input
            id="resource-name-input"
            value={resource_name}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                resource_name: e.target.value,
              })
            }
          />
          <label htmlFor="author-name-input">author name: </label>
          <input
            value={author_name}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                author_name: e.target.value,
              })
            }
          />
          <label htmlFor="url-input">URL: </label>
          <input
            id="url-input"
            value={url}
            onChange={(e) =>
              setNewResourceData({ ...newResourceData, url: e.target.value })
            }
          />
          <label htmlFor="content-type-input">content type: </label>
          <input
            id="content-type-input"
            value={content_type}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                content_type: e.target.value,
              })
            }
          />
          <label htmlFor="description-input">description: </label>
          <input
            id="description-input"
            value={description}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                description: e.target.value,
              })
            }
          />
          <label htmlFor="opinion-select">opinion:</label>
          <select
            id="opinion-select"
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                opinion: e.target.value,
              })
            }
          >
            <option disabled selected>
              nothing selected
            </option>
            {opinions.map((option, i) => (
              <option key={i}>{option.opinion}</option>
            ))}
          </select>
          <label htmlFor="opinion-reason-input">opinion-reason: </label>
          <input
            id="opinion-reason-input"
            value={opinion_reason}
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                opinion_reason: e.target.value,
              })
            }
          />
          <label htmlFor="stagename-select">stage: </label>
          <select
            id="stagename-select"
            onChange={(e) =>
              setNewResourceData({
                ...newResourceData,
                build_stage: e.target.value,
              })
            }
          >
            <option disabled selected>
              nothing selected
            </option>
            {stageNames.map((stage, i) => (
              <option key={i}>{stage.stage_name}</option>
            ))}
          </select>
          <SelectOrCreateTag tags={tags} setTags={setTags} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
