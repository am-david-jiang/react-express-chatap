import * as React from "react";

export interface IConversationProps {
  avatar?: string;
  username: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function Conversation(props: IConversationProps) {
  return (
    <li
      className="conversation"
      onClick={(e) => props.setCurrentUser(props.username)}
    >
      <img src={props.avatar} alt="Avatar" />
      <h3>{props.username}</h3>
    </li>
  );
}
