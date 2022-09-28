import getResourcesFromServer from "../utils/getResourcesFromServer";
import { MainComponentProps } from "../utils/types";
import { useEffect } from "react";
import IndividualResource from "./IndividualResource";

export default function ResourceList({
  resourceList,
  setResourceList,
}: MainComponentProps): JSX.Element {
  useEffect(() => {
    getResourcesFromServer(setResourceList);
  }, [setResourceList]);
  return (
    <div>
      {resourceList.map((resource) => (
        <IndividualResource
          key={resource.resource_id}
          resourceData={resource}
        />
      ))}
    </div>
  );
}
