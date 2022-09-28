import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import { IResourceResponse } from "./utils/types";

function App(): JSX.Element {
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);

  return (
    <div>
      <ResourceList
        resourceList={resourceList}
        setResourceList={setResourceList}
      />
      <CreateNewResource
        resourceList={resourceList}
        setResourceList={setResourceList}
      />
    </div>
  );
}

export default App;
