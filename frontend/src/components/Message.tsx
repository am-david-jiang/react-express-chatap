import moment from "moment";

export interface IMessageProps {
  avatar?: string;
  message: string;
  date: number;
  isSender: boolean;
}

export default function Message(props: IMessageProps) {
  return (
    <div className={`message ${props.isSender ? "message-sender" : ""}`}>
      <img src={props.avatar} alt="Avatar" className="message-avatar" />
      <div className="message-content">
        <div className="message-bubble">{props.message}</div>
        <p className="message-date">{moment(props.date).calendar()}</p>
      </div>
    </div>
  );
}
