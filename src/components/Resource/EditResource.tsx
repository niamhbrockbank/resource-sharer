import { useState, useEffect } from "react";
import { IResourceResponse } from "../../utils/types";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { SelectOrCreateTag } from "./NewResource/SelectOrCreateTag";
import "./FormElement.scss";
import { contentTypes } from "../../utils/contentTypes";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const templateResourceResponse: IResourceResponse = {
    resource_id: NaN,
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    content_type: "",
    rating: 50,
    notes: "",
    user_id: currentUserId,
    time_date: "",
    user_name: "",
    tag_array: [""],
    num_dislikes: NaN,
    num_likes: NaN,
    liking_users_array: null,
    disliking_users_array: null,
  };
  const [editData, setEditData] = useState<IResourceResponse>(
    templateResourceResponse
  );
  const [selectedTags, setSelectedTags] = useState<{ tag_name: string }[]>([]);

  const currentResource = resourceList.find((res) => {
    if (id === undefined) {
      return templateResourceResponse;
    } else {
      return res.resource_id === parseInt(id);
    }
  });

  useEffect(() => {
    if (currentResource) {
      setEditData(currentResource);
    }
  }, [currentResource]);

  async function handleSubmit(): Promise<void> {
    //TODO: Check validity of inputs
    try {
      await axios.put(`${baseUrl}/resources/${id}`, {
        ...editData,
        user_id: currentUserId,
        tag_array: selectedTags,
      });
      getResourcesFromServer(setResourceList);
    } catch (error) {
      console.error(error);
      window.alert("Sorry, there was an issue submitting. Try again later.");
    }

    navigate(`/resource/${id}`);
  }

  if (!id) {
    return <h1>Sorry, this resource cannot be found</h1>;
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
        <p id="rating_input_perc">{editData.rating} / 100</p>
        <input
          id="rating_input"
          value={editData.rating}
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
