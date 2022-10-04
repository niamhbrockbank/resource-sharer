import getResourcesFromServer from "../utils/getResourcesFromServer";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";
import filterBySearchTerm from "../utils/filterBySearchTerm";
import { IResourceResponse } from "../utils/types";
import { filterBySearchTags } from "../utils/filterBySearchTags";
import filterByListMode from "../utils/filterByListMode";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  searchTerm: string;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  listMode: "resource list" | "study list";
}

export default function ResourceList({
  currentUser,
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
    <>
    {/* <div id='list-title'>
    {listMode === "study list" ? <p>Study List</p> : <p>Resources</p>}
    </div> */}
    <div id='resource_list'>
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
            currentUser={currentUser}
            setResourceList={setResourceList}
            userStudylist={userStudylist}
            setUserStudylist={setUserStudylist}
          />
        ))}
    </div>
    </>
  );
}
