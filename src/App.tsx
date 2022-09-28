import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";


export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);

  return (
    <div>
      <NavigationBar currentUserManager={currentUserManager} />
      <CreateNewResource currentUserManager={currentUserManager}/>
      <ResourceList currentUserManager={currentUserManager}/>
    </div>
  );
}

export default App;
