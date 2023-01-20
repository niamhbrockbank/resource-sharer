import getResourcesFromServer from "../../utils/getResourcesFromServer";
import { useEffect } from "react";
import filterBySearchTerm from "../../utils/filterBySearchTerm";
import { IResourceResponse } from "../../utils/types";
import { filterBySearchTags } from "../../utils/filterBySearchTags";
import "./ResourceList.scss";
import ResourceCard from "../Resource/ResourceCard";

interface IProps {
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function ResourceList({
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);

  const filteredByTags: IResourceResponse[] = resourceList.filter((resource) =>
    filterBySearchTags(searchTags, resource)
  );

  const filteredResList = filteredByTags.filter((resource) =>
    filterBySearchTerm(searchTerm, resource)
  );

  return (
    <>
      <div id="resource_list_section">
        <h1 style={{ marginTop: "48px", color: "white" }}>RESOURCE LIST</h1>
        <div id="resource_list">
          {filteredResList.length > 0 ? (
            filteredResList.map((resource, i) => (
              <ResourceCard key={i} resourceData={resource} />
            ))
          ) : (
            <h1>Sorry, no resources found.</h1>
          )}
        </div>
      </div>
    </>
  );
}
