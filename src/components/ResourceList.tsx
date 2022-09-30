import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect, useState } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { ILikedResourcesResponse, IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";
import { getLikedResourcesFromServer } from "../utils/getLikedResourcesFromServer";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function ResourceList({
  currentUserManager,
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
}: IProps): JSX.Element {
  const [resourcesLikedByUser, setResourcesLikedByUser] =
    useState<ILikedResourcesResponse | null>(null);

  useEffect(() => {
    getResourcesFromServer(setResourceList);
    getLikedResourcesFromServer(
      currentUserManager[0]?.user_id,
      setResourcesLikedByUser
    );
  }, [setResourceList, currentUserManager[0]?.user_id]);

  return (
    <div>
      {resourceList
        .filter((resource) => filterBySearchTags(searchTags, resource))
        .filter((resource) => filterBySearchTerm(searchTerm, resource))
        .map((resource) => (
          <IndividualResource
            key={resource.resource_id}
            resourceData={resource}
            currentUserManager={currentUserManager}
            resourcesLikedByUser={resourcesLikedByUser}
            setResourceList={setResourceList}
          />
        ))}
    </div>
  );
}
