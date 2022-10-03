import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";
import filterByListMode from "../utils/filterByListMode";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  listMode: "resource list" | "study list";
}

export default function ResourceList({
  currentUserManager,
  searchTags,
  searchTerm,
  resourceList,
  setResourceList,
  userStudylist,
  setUserStudylist,
  listMode,
}: IProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);
  return (
    <div>
      {resourceList
        .filter((resource) => filterBySearchTags(searchTags, resource))
        .filter((resource) => filterBySearchTerm(searchTerm, resource))
        .filter((resource) =>
          filterByListMode(listMode, userStudylist, resource)
        )
        .map((resource) => (
          <IndividualResource
            key={resource.resource_id}
            resourceData={resource}
            currentUserManager={currentUserManager}
            userStudylist={userStudylist}
            setUserStudylist={setUserStudylist}
          />
        ))}
    </div>
  );
}
