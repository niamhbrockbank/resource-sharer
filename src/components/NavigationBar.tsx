import { IUserResponse } from "../utils/types";
import SearchBar from "./SearchBar";

import SignIn from "./SignIn";
import StudylistButton from "./StudylistButton";
import { TagsCloud } from "./TagsCloud";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTags: string[];
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  listMode: "resource list" | "study list";
  setListMode: React.Dispatch<
    React.SetStateAction<"resource list" | "study list">
  >;
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export default function NavigationBar({
  currentUserManager,
  searchTags,
  setSearchTags,
  searchTerm,
  setSearchTerm,
  listMode,
  setListMode,
  setUserStudylist,
}: IProps): JSX.Element {
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagsCloud searchTags={searchTags} setSearchTags={setSearchTags} />
      <SignIn
        currentUserManager={currentUserManager}
        setUserStudylist={setUserStudylist}
      />
      <StudylistButton
        currentUserManager={currentUserManager}
        listMode={listMode}
        setListMode={setListMode}
      />
    </>
  );
}
