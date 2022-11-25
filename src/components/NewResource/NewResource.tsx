import { IResourceResponse, IUserResponse } from "../../utils/types";
import CreateNewResource from "./CreateNewResource";
import FormElement from "./FormElement";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  opinions: {
    opinion: string;
  }[];
  buildStageNames: {
    stage_name: string;
  }[];
}

export default function NewResource({
  setResourceList,
  currentUserManager,
  opinions,
  buildStageNames,
}: IProps): JSX.Element {
  return (
    <>
    <CreateNewResource
      currentUserManager={currentUserManager}
      setResourceList={setResourceList}
      opinions={opinions}
      buildStageNames={buildStageNames}
    />
    <FormElement labelText={'Report Title'} placeholderText={'Report Title'}/>
    </>
  );
}
