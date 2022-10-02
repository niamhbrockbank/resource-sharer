import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function ResourceList({
  currentUser,
  searchTags,
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
        .filter((resource) => filterBySearchTags(searchTags, resource))
        .filter((resource) => filterBySearchTerm(searchTerm, resource))
        .map((resource) => (
          <IndividualResource
            key={resource.resource_id}
            resourceData={resource}
            currentUser={currentUser}
            setResourceList={setResourceList}
          />
        ))}
    </div>
  );
}
