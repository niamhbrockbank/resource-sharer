import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import NavigationBar from "./components/NavigationBar";
import { ILikedResourcesResponse, IResourceResponse } from "./utils/types";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);
  const [resourcesLikedByUser, setResourcesLikedByUser] =
    useState<ILikedResourcesResponse | null>(null);

  return (
    <div>
      <NavigationBar
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUserManager={currentUserManager}
        setResourcesLikedByUser={setResourcesLikedByUser}
      />
      <CreateNewResource
        currentUserManager={currentUserManager}
        setResourceList={setResourceList}
      />
      <ResourceList
        searchTags={searchTags}
        searchTerm={searchTerm}
        currentUserManager={currentUserManager}
        resourceList={resourceList}
        setResourceList={setResourceList}
        resourcesLikedByUser={resourcesLikedByUser}
        setResourcesLikedByUser={setResourcesLikedByUser}
      />
    </div>
  );
}

export default App;
