import { siteName } from "../../utils/siteName";
import "./Footer.scss";

export default function Footer(): JSX.Element {
  return (
    <>
      <div id="footer">{siteName}</div>
    </>
  );
}
