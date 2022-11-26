import { IUserResponse } from "../../utils/types";
import SignIn from "./SignIn/SignIn";
import "./NavigationBar.scss";
import { useState } from "react";
import Menu from "./Menu/Menu";

interface IProps {
  currentUserManager: [
    IUserResponse | undefined,
    React.Dispatch<React.SetStateAction<IUserResponse | undefined>>
  ];
  setUserStudylist: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export default function NavigationBar({
  currentUserManager,
  setUserStudylist,
}: IProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div id="navigation_bar">
        <img
          src="./img/menu.svg"
          alt="menu list button"
          onClick={() => setShowMenu(!showMenu)}
        />
        <SignIn
          currentUserManager={currentUserManager}
          setUserStudylist={setUserStudylist}
        />
      </div>
      <h1 id='site_name'>Study Resources</h1>
      {showMenu && <Menu setShowMenu={setShowMenu} />}

      {/* TODO: Move filter area to its own component */}
    </>
  );
}
