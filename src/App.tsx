import { useState } from "react";
import NavigationBar from "./NavigationBar";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);

  return <NavigationBar currentUserManager={currentUserManager} />;
}

export default App;
