import { IUserResponse } from "../App";
import SearchBar from "./SearchBar";

import SignIn from "./SignIn";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavigationBar({
  currentUserManager,
  searchTerm,
  setSearchTerm,
}: IProps): JSX.Element {
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SignIn currentUserManager={currentUserManager} />
    </>
  );
}
