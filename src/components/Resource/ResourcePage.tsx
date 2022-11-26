import { useParams } from "react-router-dom"
import { IResourceResponse } from "../../utils/types"

interface IProps{
    resourceList : IResourceResponse[]
}

//TODO: Only fetch all the data for the resources that you click on to the full page of 
//TODO: Only pass the data from the resource you're looking at, rather than the whole resourceList
export default function ResourcePage({resourceList} : IProps):JSX.Element{
    const { id } = useParams()
    if (id) {
        const resource = resourceList.find(res => res.resource_id === parseInt(id))
        return (
            <>
                <p>You've made it to {id}</p>
                <p>{resource?.resource_name}</p>
            </>
            )
    } else {
        return <h1>Sorry, that resource can't be found</h1>
    }
    
    
}