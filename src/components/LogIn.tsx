import { IUserResponse } from "../utils/types";
import SignIn from "./NavigationBar/SignIn/SignIn";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}
export default function LogIn({
  currentUserManager,
  setUserStudylist,
}: IProps): JSX.Element {
  return (
    <>
      <SignIn
        currentUserManager={currentUserManager}
        setUserStudylist={setUserStudylist}
      />
    </>
  );
}
