import axios from "axios";
import { baseUrl } from "./baseUrl";

export default async function getStudylistFromServer(
  newUserID: number | undefined,
  setStudylist: React.Dispatch<React.SetStateAction<number[] | null>>
): Promise<void> {
  if (newUserID) {
    try {
      const studylistResponse = await axios.get(
        `${baseUrl}/users/${newUserID}/study_list`
      );
      const justNumbersStudylist: number[] = studylistResponse.data.map(
        (listItem: { resource_id: number }) => listItem.resource_id
      );
      setStudylist(justNumbersStudylist);
    } catch (error) {
      console.error(error);
    }
  }
}
