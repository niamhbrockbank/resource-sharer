import { IUserResponse } from "../../utils/types";
import SignIn from "./SignIn/SignIn";
import "./NavigationBar.scss";
import { useState } from "react";
import Menu from "./Menu/Menu";
import { useLocation } from "react-router-dom";

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
  const location = useLocation().pathname

  return (
    <>
      <div id="navigation_bar">
        {location !== '/' && <h1>Study Resources</h1>}
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
      {/* TODO: Deal with site name being half way scrolled to top on home page overlapping menu */}
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      {location === '/' && <h1 id='site_name'>Study Resources</h1>}
      

      {/* TODO: Move filter area to its own component */}
    </>
  );
}
