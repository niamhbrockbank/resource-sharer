import getResourcesFromServer from "../utils/getResourcesFromServer";
import { IResourceResponse } from "../utils/types";
import { useState, useEffect } from "react";
import IndividualResource from "./IndividualResource";
import { IUserResponse } from "../App";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
}

export default function ResourceList({
  currentUserManager,
}: IProps): JSX.Element {
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, []);
  return (
    <div>
      {resourceList.map((resource) => (
        <IndividualResource
          key={resource.resource_id}
          resourceData={resource}
          currentUserManager={currentUserManager}
        />
      ))}
    </div>
  );
}
