import Conversation from "./Conversation";

import { useAppSelector } from "../app/hooks";

export interface IConversationsListProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function ConversationsList(props: IConversationsListProps) {
  const receivers = useAppSelector((state) => state.chats.receivers);
  return (
    <ul className="conversations">
      {receivers.map((receiver) => (
        <Conversation
          avatar={receiver.receiverAvatar}
          username={receiver.receiverName}
          setCurrentUser={props.setCurrentUser}
          key={receiver.receiverName}
        />
      ))}
    </ul>
  );
}
