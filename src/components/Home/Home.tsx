import { IUserResponse } from "../../App";
import { IResourceResponse } from "../../utils/types";
import ResourceList from "../ResourceList/ResourceList";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";

interface IProps {
  currentUser: IUserResponse | undefined;
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  userStudylist: number[] | null;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function Home({
  currentUser,
  searchTags,
  searchTerm,
  setSearchTerm,
  setSearchTags,
  resourceList,
  setResourceList,
  userStudylist,
  setUserStudylist,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchTags={searchTags}
        setSearchTags={setSearchTags}
      />
      {/* <TopResources /> */}
      <ResourceList
        searchTags={searchTags}
        searchTerm={searchTerm}
        currentUser={currentUser}
        resourceList={resourceList}
        setResourceList={setResourceList}
        userStudylist={userStudylist}
        setUserStudylist={setUserStudylist}
        opinions={opinions}
        buildStageNames={buildStageNames}
      />
    </>
  );
}
