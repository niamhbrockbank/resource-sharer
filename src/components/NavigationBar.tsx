import { IUserResponse } from "../App";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
}

export default function NavigationBar({
  currentUserManager,
}: IProps): JSX.Element {
  return (
    <>
      <SearchBar />
      <SignIn currentUserManager={currentUserManager} />
    </>
  );
}
