import axios from "axios";
import { useEffect, useState } from "react";
import { IUserResponse } from "../../utils/types";
import { baseUrl } from "../../utils/baseUrl";
// import getStudylistFromServer from "../../utils/getStudylistFromServer";
import "./SignIn.scss";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
}

//TODO: Add sign in with Google
export default function SignIn({
  currentUserManager
}: IProps): JSX.Element {
  const setCurrentUser = currentUserManager[1];
  const [userList, setUserList] = useState<IUserResponse[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(baseUrl + "/users");
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  //TODO: Find a more succinct way to handleSelectUser
  async function handleSelectUser(selectedId: string): Promise<void> {
    const futureCurrentUser = userList.find(
      (user) => parseInt(selectedId) === user.user_id
    );

    setCurrentUser(futureCurrentUser);
  }

  return (
    <div id="sign_in">
      <h1>SIGN IN</h1>
      <select
        id="select_user"
        onChange={(e) => handleSelectUser(e.target.value)}
      >
        <option value={undefined}>Select User</option>
        {userList.map((user, i) => (
          <option key={i} value={user.user_id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
