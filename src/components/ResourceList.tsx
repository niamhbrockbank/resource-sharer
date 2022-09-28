import getResourcesFromServer from "../utils/getResourcesFromServer";
import { IResourceResponse } from "../utils/types";
import { useState, useEffect } from "react";
import IndividualResource from "./IndividualResource";
import filterBySearchTerm from "../utils/filterBySearchTerm";

interface IResourceListProps {
  searchTerm: string;
}

export default function ResourceList({
  searchTerm,
}: IResourceListProps): JSX.Element {
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, []);
  return (
    <div>
      {resourceList
        .filter((resource) => filterBySearchTerm(searchTerm, resource))
        .map((resource) => (
          <IndividualResource
            key={resource.resource_id}
            resourceData={resource}
          />
        ))}
    </div>
  );
}
