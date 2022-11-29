import { useState } from "react";
import { IResourceRequest } from "../../../utils/types";
import { IResourceResponse } from "../../../utils/types";
import { SelectOrCreateTag } from "./SelectOrCreateTag";
import axios from "axios";
import { inputsValid } from "../../../utils/inputsValid";
import { baseUrl } from "../../../utils/baseUrl";
import "../FormElement.scss";
import "./NewResource.scss";

import getResourcesFromServer from "../../../utils/getResourcesFromServer";

import { IUserResponse } from "../../../utils/types";
import { contentTypes } from "../../../utils/contentTypes";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export const templateResourceRequest = {
  resource_name: "",
  author_name: "",
  url: "",
  description: "",
  content_type: "",
  rating: 50,
  notes: "",
  user_id: NaN,
};

export default function NewResource({
  setResourceList,
  currentUserManager
}: IProps): JSX.Element {
  const currentUser = currentUserManager[0];

  const [newResourceData, setNewResourceData] = useState<IResourceRequest>(
    templateResourceRequest
  );

  const {
    resource_name,
    url,
    author_name,
    rating,
    notes,
    description,
  } = newResourceData;
  const [selectedTags, setSelectedTags] = useState<{ tag_name: string }[]>([]);

  const handleSubmit = async () => {
    if (inputsValid(newResourceData)) {
      try {
        await axios.post(baseUrl + "/resources", {
          ...newResourceData,
          user_id: currentUser?.user_id,
          tag_array: selectedTags,
        });

        await getResourcesFromServer(setResourceList);
      } catch (error) {
        window.alert("That url is already taken");
      }
    }
  };

  return (
    <div id="new_resource">
      <h1>ADD NEW RESOURCE</h1>

      <div className="form_element">
        <label htmlFor="resource-name-input">Resource Name</label>
        <input
          id="resource-name-input"
          value={resource_name}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              resource_name: e.target.value,
            })
          }
          placeholder="Resource Title"
        />
      </div>

      <div className="form_element">
        <label htmlFor="author-name-input">Author Name</label>
        <input
          id="author-name-input"
          value={author_name}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              author_name: e.target.value,
            })
          }
          placeholder="Author"
        />
      </div>

      <div className="form_element">
        <label htmlFor="url-input">URL</label>
        <input
          id="url-input"
          value={url}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              url: e.target.value,
            })
          }
          placeholder="URL"
        />
      </div>

      <div className="form_element">
        <label htmlFor="content_type_select">Content Type</label>
        <select
          id='content_type_select'
          defaultValue={"Nothing Selected"}
          onChange={(e) => {
            setNewResourceData({...newResourceData, content_type: e.target.value})
          }}
          >
          <option disabled>Nothing Selected</option>
          {contentTypes.map((type, i) => <option key={i}>{type}</option>)}
        </select>
      </div>

      <div className="form_element">
        <label htmlFor="description-input">Description</label>
        <input
          id="description-input"
          value={description}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>
      <div className="form_element">
        <label htmlFor="rating_input">Rating</label>
        {/* TODO: Limit this to only numbers input */}
        <input id='rating_input' value={rating}
        type='range' min='0' max='100' 
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
              rating: parseInt(e.target.value),
            })} ></input>
      </div>
      <div className="form_element">
        <label htmlFor="notes_input">Notes</label>
        <input
          id="notes_input"
          value={notes}
          onChange={(e) =>
            setNewResourceData({
              ...newResourceData,
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
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </div>
  );
}
