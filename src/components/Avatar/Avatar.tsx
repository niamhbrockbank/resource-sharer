import { useNavigate } from "react-router-dom";
import "./Avatar.scss";

interface IProps {
  name: string;
  nav_bar? : boolean;
}

export default function Avatar({ name, nav_bar }: IProps): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      {nav_bar ?
      <div className="avatar" onClick={() => navigate('/signin')}>{name.slice(0, 1)}</div>
      :
      <div className="avatar">{name.slice(0, 1)}</div>
}
    </>
  );
}
