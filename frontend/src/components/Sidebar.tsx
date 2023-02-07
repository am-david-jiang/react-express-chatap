import ConversationsList from "../components/ConversationsList";
import TopBar from "../components/TopBar";

export interface ISideBarProps {
  username: string | null;
  userAvatar: string;
  activeModal: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideBar(props: ISideBarProps) {
  return (
    <div className="sidebar">
      <TopBar
        username={props.username}
        avatar={props.userAvatar}
        activeModal={props.activeModal}
      />
      <ConversationsList setCurrentUser={props.setCurrentUser} />
    </div>
  );
}
