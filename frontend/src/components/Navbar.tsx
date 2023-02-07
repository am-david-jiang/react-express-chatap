import { Link } from "react-router-dom";

import Logo from "../assets/svg/logo-no-background.svg";

export interface INavbarProps {
  className: string;
}

export default function Navbar(props: INavbarProps) {
  return (
    <div className="login-navbar">
      <Link to="/">
        <img src={Logo} alt="Logo Icon" />
      </Link>
      <Link to="/">Home</Link>
    </div>
  );
}
