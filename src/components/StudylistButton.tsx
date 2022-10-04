
import { Button } from "react-bootstrap";
import { IUserResponse } from "../App";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  listMode: "resource list" | "study list";
  setListMode: React.Dispatch<
    React.SetStateAction<"resource list" | "study list">
  >;
}

export default function StudylistButton({
  currentUserManager,
  listMode,
  setListMode,
}: IProps): JSX.Element {
  const currentUser = currentUserManager[0];
  return (
    <>
      {listMode === "study list" ? (
        <Button
          variant="secondary"
          type="button"
          onClick={() => setListMode("resource list")}
        >
          View resource list
        </Button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          disabled={currentUser === undefined}
          onClick={() => setListMode("study list")}
        >
          View studylist
        </Button>
      )}
    </>
  );
}
