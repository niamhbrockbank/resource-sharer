import getResourcesFromServer from "../utils/getResourcesFromServer";
import { IResourceResponse } from "../utils/types";
import { useState, useEffect } from "react";
import IndividualResource from "./IndividualResource";

export default function ResourceList(): JSX.Element {
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
        />
      ))}
    </div>
  );
}
