import "./Menu.scss";
import { Link } from "react-router-dom";

interface MenuOption {
  name: string;
  route: string;
}

interface IProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ setShowMenu }: IProps): JSX.Element {
  const menuOptions: MenuOption[] = [
    { name: "Home", route: "/" },
    { name: "Study List", route: "/study" },
    { name: "Add New Resource", route: "/new" },
    { name: "Log Out", route : "/login"}
  ];
  //TODO: Make add new resource a button
  //TODO: Only show study list and logout options if signed in - show sign in button instead
  //TODO: Underline current page

  return (
    <ul id="menu">
      {menuOptions.map((option, i) => {
        return (
          <Link
            to={option.route}
            key={i}
            className="option"
            onClick={() => setShowMenu(false)}
          >
            <li key={i}>{option.name}</li>
          </Link>
        );
      })}
    </ul>
  );
}
