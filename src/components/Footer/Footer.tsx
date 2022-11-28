import { siteName } from "../../utils/siteName";

export default function Footer(): JSX.Element {
  return (
    <>
      <div style={{ height: "48px", marginTop: "24px", paddingTop: "8px" }}>
        {siteName}
      </div>
    </>
  );
}
