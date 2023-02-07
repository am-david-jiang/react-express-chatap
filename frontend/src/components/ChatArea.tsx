import { useAppSelector } from "../app/hooks";
import ChatBar from "./ChatBar";
import Message from "./Message";

export interface IChatAreaProps {
  userAvatar: string;
  receiverAvatar: string;
  currentChatName: string;
  textMessage: string;
  setTextMessage: React.Dispatch<React.SetStateAction<string>>;
  sendText: (e: React.SyntheticEvent) => void;
}

export default function ChatArea(props: IChatAreaProps) {
  const messages = useAppSelector((state) => state.chats.messages).filter(
    (message) =>
      message.sender === props.currentChatName ||
      message.receiver === props.currentChatName
  );

  return (
    <div className="chatarea">
      <ChatBar username={props.currentChatName} />
      <ul className="chatarea-messages">
        {messages.map((message) => (
          <Message
            avatar={
              message.isSentBySender ? props.userAvatar : props.receiverAvatar
            }
            message={message.text}
            date={message.createdAt}
            isSender={message.isSentBySender}
            key={message.createdAt}
          />
        ))}
      </ul>
      <form className="chatarea-actions" onSubmit={props.sendText}>
        <textarea
          rows={2}
          placeholder="Type something to send"
          value={props.textMessage}
          onChange={(e) => props.setTextMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
