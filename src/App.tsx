import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import NavigationBar from "./components/NavigationBar";
import { IResourceResponse } from "./utils/types";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}


function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);

  return (
    <div>
      <NavigationBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUserManager={currentUserManager}
      />
      <CreateNewResource currentUserManager={currentUserManager}
        setResourceList={setResourceList} />
      <ResourceList
        searchTerm={searchTerm}
        currentUserManager={currentUserManager}
        resourceList={resourceList}
        setResourceList={setResourceList}
      />
    </div>
  );
}

export default App;
