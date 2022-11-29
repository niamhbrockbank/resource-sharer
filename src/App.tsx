import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { IResourceResponse } from "./utils/types";
import "./styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import StudyList from "./components/ResourceList/StudyList";
import Resource from "./components/Resource/Resource";
import Footer from "./components/Footer/Footer";
import EditResource from "./components/Resource/EditResource";
import SignIn from "./components/SignIn/SignIn";
import NewResource from "./components/Resource/NewResource/NewResource";

export interface IUserResponse {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

//TODO: Simplify App component
//TODO: Add react router
//TODO: use useReducer
function App(): JSX.Element {
  const currentUserManager = useState<IUserResponse | undefined>(undefined);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resourceList, setResourceList] = useState<IResourceResponse[]>([]);
  const [userStudylist, setUserStudylist] = useState<number[] | null>(null);

  return (
    <>
      <NavigationBar currentUser={currentUserManager[0]} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTags={searchTags}
              searchTerm={searchTerm}
              resourceList={resourceList}
              setResourceList={setResourceList}
              setSearchTerm={setSearchTerm}
              setSearchTags={setSearchTags}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn
              currentUserManager={currentUserManager}
            />
          }
        />
        {/* TODO: If not logged in and try to access new, redirect to sign in page */}
        <Route
          path="/new"
          element={
            <NewResource
              currentUserManager={currentUserManager}
              setResourceList={setResourceList}
            />
          }
        />
        {/* TODO: use route params to get users study list */}
        {/* <Route
          path="/study"
          element={
            <StudyList
              searchTags={searchTags}
              searchTerm={searchTerm}
              currentUser={currentUserManager[0]}
              resourceList={resourceList}
              setResourceList={setResourceList}
              userStudylist={userStudylist}
              setUserStudylist={setUserStudylist}
            />
          }
        /> */}
        <Route
          path="/resource/:id"
          element={
            <Resource
              setResourceList={setResourceList}
              currentUser={currentUserManager[0]}
              userStudylist={userStudylist}
              setUserStudylist={setUserStudylist}
            />
          }
        />
        <Route
          path="/resource/:id/edit"
          element={
            <EditResource
              currentUserId={currentUserManager[0]?.user_id ?? NaN}
              resourceList={resourceList}
              setResourceList={setResourceList}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
