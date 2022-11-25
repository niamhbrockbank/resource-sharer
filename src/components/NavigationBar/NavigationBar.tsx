import { IUserResponse } from "../../utils/types";
import SignIn from "./SignIn/SignIn";
import "./NavigationBar.scss";

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
      <div id="navigation_bar">
        <h1>Study Resources</h1>
        <img src="./img/menu.svg" alt="menu list button" />
        <SignIn
          currentUserManager={currentUserManager}
          setUserStudylist={setUserStudylist}
        />
      </div>

      {/* TODO: Move filter area to its own component */}
    </>
  );
}
