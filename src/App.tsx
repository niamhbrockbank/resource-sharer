import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { IResourceResponse } from "./utils/types";
import "./styles.css";
import { baseUrl } from "./utils/baseUrl";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NewResource from "./components/NewResource/NewResource";
import StudyList from "./components/ResourceList/StudyList";

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
  const [opinions, setOpinions] = useState<{ opinion: string }[]>([]);
  const [buildStageNames, setBuildStageNames] = useState<
    { stage_name: string }[]
  >([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const opinionsResponse = await axios.get(baseUrl + "/opinions");
        setOpinions(opinionsResponse.data);

        const buildStageNamesResponse = await axios.get(
          baseUrl + "/stage_names"
        );
        setBuildStageNames(buildStageNamesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOptions();
  }, []);

  return (
    <>
      <NavigationBar
        currentUserManager={currentUserManager}
        setUserStudylist={setUserStudylist}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTags={searchTags}
              searchTerm={searchTerm}
              currentUser={currentUserManager[0]}
              resourceList={resourceList}
              setResourceList={setResourceList}
              userStudylist={userStudylist}
              setUserStudylist={setUserStudylist}
              opinions={opinions}
              buildStageNames={buildStageNames}
              setSearchTerm={setSearchTerm}
              setSearchTags={setSearchTags}
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
              opinions={opinions}
              buildStageNames={buildStageNames}
            />
          }
        />
        {/* TODO: use route params to get users study list */}
        <Route
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
              opinions={opinions}
              buildStageNames={buildStageNames}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
