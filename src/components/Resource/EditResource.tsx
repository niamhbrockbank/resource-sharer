import { useState, useEffect } from "react";
import { IResourceRequest, IResourceResponse } from "../../utils/types";
import { templateResourceRequest } from "./NewResource/NewResource";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { SelectOrCreateTag } from "./NewResource/SelectOrCreateTag";
import { inputsValid } from "../../utils/inputsValid";
import "./FormElement.scss";

interface IEditResourceProps {
  currentUserId: number;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function EditResource({
  currentUserId,
  resourceList,
  setResourceList,
  opinions,
  buildStageNames,
}: IEditResourceProps): JSX.Element {
  //TODO: Code this like on the resource page
  const resource_data = resourceList[0];
  const {
    resource_id,
    resource_name,
    author_name,
    url,
    description,
    content_type,
    build_stage,
    opinion,
    opinion_reason,
    user_id,
  } = resource_data;

  const [editData, setEditData] = useState<IResourceRequest>(
    templateResourceRequest
  );
  const [selectedTags, setSelectedTags] = useState<{ tag_name: string }[]>([]);

  useEffect(() => {
    setEditData({
      resource_name: resource_name,
      author_name: author_name,
      url: url,
      description: description,
      content_type: content_type,
      build_stage: build_stage,
      opinion: opinion,
      opinion_reason: opinion_reason,
      user_id: user_id,
    });
  }, [
    resource_name,
    author_name,
    url,
    description,
    content_type,
    build_stage,
    opinion,
    opinion_reason,
    user_id,
  ]);

  async function handleSubmit(): Promise<void> {
    try {
      if (inputsValid(editData)) {
        await axios.put(`${baseUrl}/resources/${resource_id}`, {
          ...editData,
          user_id: currentUserId,
          tag_array: selectedTags,
        });
        getResourcesFromServer(setResourceList);
      }
    } catch (error) {
      console.error(error);
      window.alert("That url has already been submitted");
    }
  }

  return (
    <div id="edit_resource">
      <h1>EDIT RESOURCE</h1>
      <div className="form_element">
        <label htmlFor="resource-name-edit">Resource Name</label>
        <input
          id="resource-name-edit"
          value={editData.resource_name}
          onChange={(e) =>
            setEditData({
              ...editData,
              resource_name: e.target.value,
            })
          }
          placeholder="Resource Title"
        />
      </div>

      <div className="form_element">
        <label htmlFor="author-name-edit">Author Name</label>
        <input
          id="author-name-edit"
          value={editData.author_name}
          onChange={(e) =>
            setEditData({
              ...editData,
              author_name: e.target.value,
            })
          }
          placeholder="Author"
        />
      </div>
      <div className="form_element">
        <label htmlFor="url-edit">URL</label>
        <input
          id="url-edit"
          value={editData.url}
          onChange={(e) => setEditData({ ...editData, url: e.target.value })}
          placeholder="URL"
        />
      </div>
      <div className="form_element">
        <label htmlFor="content-type-edit">Content Type</label>
        <input
          id="content-type-edit"
          value={editData.content_type}
          onChange={(e) =>
            setEditData({
              ...editData,
              content_type: e.target.value,
            })
          }
          placeholder="Content Type"
        />
      </div>
      <div className="form_element">
        <label htmlFor="description-edit">Description</label>
        <input
          id="description-edit"
          value={editData.description}
          onChange={(e) =>
            setEditData({
              ...editData,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>
      <div className="form_element">
        <label htmlFor="opinion-select-edit">Opinion</label>
        <select
          id="opinion-select-edit"
          defaultValue={resource_data.opinion}
          onChange={(e) =>
            setEditData({
              ...editData,
              opinion: e.target.value,
            })
          }
        >
          <option disabled>Nothing Selected</option>
          {opinions.map((option, i) => (
            <option key={i}>{option.opinion}</option>
          ))}
        </select>
      </div>
      <div className="form_element">
        <label htmlFor="opinion-reason-input">Opinion Explanation</label>
        <input
          id="opinion-reason-input"
          value={editData.opinion_reason}
          onChange={(e) =>
            setEditData({
              ...editData,
              opinion_reason: e.target.value,
            })
          }
          placeholder="Explanation"
        />
      </div>
      <div className="form_element">
        <label htmlFor="buildStageName-select">Stage</label>
        <select
          id="buildStageName-select"
          defaultValue={resource_data.build_stage}
          onChange={(e) =>
            setEditData({
              ...editData,
              build_stage: e.target.value,
            })
          }
        >
          <option disabled>Nothing Selected</option>
          {buildStageNames.map((stage, i) => (
            <option key={i}>{stage.stage_name}</option>
          ))}
        </select>
      </div>
      <SelectOrCreateTag
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <hr />
      {/* TODO: Add cancel button */}
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </div>
  );
}
