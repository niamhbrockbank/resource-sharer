import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useCallback, useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { ILikedResourcesResponse, IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";
import { getLikedResourcesFromServer } from "../utils/getLikedResourcesFromServer";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  resourcesLikedByUser: ILikedResourcesResponse | null;
  setResourcesLikedByUser: React.Dispatch<
    React.SetStateAction<ILikedResourcesResponse | null>
  >;
}

export default function ResourceList({
  currentUser,
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
  resourcesLikedByUser,
  setResourcesLikedByUser,
}: IProps): JSX.Element {
  const getResourcesAndLikes = useCallback(async () => {
    getResourcesFromServer(setResourceList);
    getLikedResourcesFromServer(currentUser, setResourcesLikedByUser);
  }, [setResourceList, setResourcesLikedByUser, currentUser]);

  useEffect(() => {
    getResourcesAndLikes();
    console.log("running useEffect");
  }, [getResourcesAndLikes]);

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
            resourcesLikedByUser={resourcesLikedByUser}
            setResourcesLikedByUser={setResourcesLikedByUser}
            setResourceList={setResourceList}
          />
        ))}
    </div>
  );
}
