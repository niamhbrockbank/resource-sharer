import { IUserResponse } from "../../utils/types";
import { IResourceResponse } from "../../utils/types";
import ResourceCard from "../Resource/ResourceCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getResourcesFromServer from "../../utils/getResourcesFromServer";

interface IProps {
  currentUser: IUserResponse | undefined;
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
  studyList: number[] | null;
}

export default function StudyList({
  currentUser,
  resourceList,
  setResourceList,
  studyList
}: IProps): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    //TODO: Preset resourceList as undefined (in App) and compare to that rather than length
    if (resourceList.length === 0){
      getResourcesFromServer(setResourceList)
    }

    if (!currentUser){
      navigate('/signin')
    }

  }, [navigate, resourceList, setResourceList, currentUser])

  return (
    <>
      <h1>{currentUser && `${currentUser.name.toUpperCase()}'s`} STUDY LIST</h1>
      <div id="resource_list">
        {resourceList.filter(res => studyList?.includes(res.resource_id))
          .map((resource, i) => (
            <ResourceCard key={i} resourceData={resource} />
          ))}
      </div>
    </>
  );
}