import BackIcon from "../assets/svg/back.svg";
import DotsIcon from "../assets/svg/dots.svg";

export interface IChatBarProps {
  username: string;
}

export default function ChatBar({ username }: IChatBarProps) {
  return (
    <div className="chatbar">
      <div className="chatbar-left">
        <img src={BackIcon} alt="Back" />
        <p className="chatbar-username">{username}</p>
      </div>
      <img src={DotsIcon} alt="More" className="charbar-more" />
    </div>
  );
}
