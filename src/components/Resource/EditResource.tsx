import { useState, useEffect } from "react";
import { IResourceRequest, IResourceResponse } from "../../utils/types";
import { templateResourceRequest } from "./NewResource/NewResource";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { SelectOrCreateTag } from "./NewResource/SelectOrCreateTag";
import { inputsValid } from "../../utils/inputsValid";
import "./FormElement.scss";
import { contentTypes } from "../../utils/contentTypes";

interface IEditResourceProps {
  currentUserId: number;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function EditResource({
  currentUserId,
  resourceList,
  setResourceList,
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
    rating,
    notes,
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
      rating: rating,
      notes: notes,
      user_id: user_id,
    });
  }, [
    resource_name,
    author_name,
    url,
    description,
    content_type,
    rating,
    notes,
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
        <label htmlFor="content_type_edit">Content Type</label>
        <select
          id="content_type_edit"
          defaultValue={"Nothing Selected"}
          onChange={(e) => {
            setEditData({ ...editData, content_type: e.target.value });
          }}
        >
          <option disabled>Nothing Selected</option>
          {contentTypes.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </select>
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
        <label htmlFor="rating_edit">Rating</label>
        {/* TODO: Limit this to only numbers input */}
        <input
          id="rating_edit"
          value={rating}
          type="range"
          min="0"
          max="100"
          onChange={(e) =>
            setEditData({
              ...editData,
              rating: parseInt(e.target.value),
            })
          }
        ></input>
      </div>
      <div className="form_element">
        <label htmlFor="notes-input">Notes</label>
        <input
          id="notes-input"
          value={editData.notes}
          onChange={(e) =>
            setEditData({
              ...editData,
              notes: e.target.value,
            })
          }
          placeholder="Notes"
        />
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
