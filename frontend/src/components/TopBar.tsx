import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/AuthSlice";

import LogoutIcon from "../assets/svg/logout.svg";
import PlusIcon from "../assets/svg/plus.svg";

export interface ITopBarProps {
  username: string | null;
  avatar?: string;
  activeModal: () => void;
}

export default function TopBar(props: ITopBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(logout())
      .then(() => navigate("/login"))
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      );
  };

  return (
    <div className="topbar">
      <div className="topbar-user">
        <img src={props.avatar} alt="Avatar" className="topbar-avatar" />
        <p className="topbar-username">{props.username}</p>
      </div>
      <div className="topbar-actions">
        <img
          src={PlusIcon}
          alt="Add User"
          className="topbar-icon"
          onClick={props.activeModal}
        />
        <img
          src={LogoutIcon}
          alt="Logout Icon"
          className="topbar-icon"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
