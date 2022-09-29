import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { IResourceResponse } from "../utils/types";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function ResourceList({
  currentUserManager,
  searchTerm,
  resourceList,
  setResourceList,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);
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
