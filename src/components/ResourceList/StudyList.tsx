import { IUserResponse } from "../../utils/types";
import { IResourceResponse } from "../../utils/types";
import ResourceCard from "../Resource/ResourceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import getResourcesFromServer from "../../utils/getResourcesFromServer";

interface IProps {
  currentUser: IUserResponse | undefined;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}

export default function StudyList({
  currentUser,
  resourceList,
  setResourceList
}: IProps): JSX.Element {
  const [studyList, setStudyList] = useState<{resource_id : number}[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    //TODO: Preset resourceList as undefined (in App) and compare to that rather than length
    if (resourceList.length === 0){
      getResourcesFromServer(setResourceList)
    }

    async function getStudyList(){
      if(currentUser){
        const {user_id} = currentUser
        const response = await axios.get(`${baseUrl}/users/${user_id}/study_list`)
        setStudyList(response.data)
      } else {
        navigate('/signin')
      }
    }

    getStudyList()
  }, [currentUser, navigate, resourceList, setResourceList])

  const studyListIds = studyList.map(res => res.resource_id)

  return (
    <>
      <h1>{currentUser && `${currentUser.name.toUpperCase()}'s`} STUDY LIST</h1>
      <div id="resource_list">
        {resourceList.filter(res => studyListIds.includes(res.resource_id))
          .map((resource, i) => (
            <ResourceCard key={i} resourceData={resource} />
          ))}
      </div>
    </>
  );
}