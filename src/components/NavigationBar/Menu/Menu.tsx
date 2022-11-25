import './Menu.scss'
import { Link } from "react-router-dom";

interface MenuOption {
    name : string;
    route : string;
}
export default function Menu():JSX.Element{
    const menuOptions : MenuOption[] = [{name : 'Home', route : '/'}, {name: 'Study List', route:'/study'}, {name : 'Add New Resource', route: '/new'}]
    //TODO: Make add new resource a button

    return (
        <ul id="menu">  
            {menuOptions.map((option, i) => {
                return (
                <Link to={option.route} key={i} className="option">
                    <li key={i}>{option.name}</li>
                </Link>
                )
                })}
        </ul>
    )
}