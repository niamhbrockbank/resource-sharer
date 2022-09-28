import getResourcesFromServer from "../utils/getResourcesFromServer";
import { IResourceResponse } from "../utils/types";
import { useState, useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTerm: string;
}

export default function ResourceList({
  currentUserManager, searchTerm
}: IProps): JSX.Element {
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
            currentUserManager={currentUserManager}
          />
        ))}
    </div>
  );
}
