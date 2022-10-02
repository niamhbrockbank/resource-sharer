import { IUserResponse } from "../App";
import SearchBar from "./SearchBar";

import SignIn from "./SignIn";
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
}

export default function NavigationBar({
  currentUserManager,
  searchTags,
  setSearchTags,
  searchTerm,
  setSearchTerm,
}: IProps): JSX.Element {
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagsCloud searchTags={searchTags} setSearchTags={setSearchTags} />
      <SignIn currentUserManager={currentUserManager} />
    </>
  );
}
