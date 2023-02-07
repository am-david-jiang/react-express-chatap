import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { io, Socket } from "socket.io-client";

import SideBar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import Modal from "../components/Modal";
import Welcome from "../components/Welcome";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  init,
  addUser,
  addMessage,
  SyncReceiverAvatars,
} from "../features/ChatsSlice";
import type { Message } from "../features/ChatsSlice";

// import ReceiverAvatar from "../assets/png/Teamwork-2.png";
import useModal from "../hooks/useModal";

interface ArrivalMessage {
  sender: string;
  text: string;
  createdAt: number;
}

export interface IChatProps {}

const socket: Socket = io("ws://localhost:5000", {
  autoConnect: false,
  forceNew: true,
});

export default function Chat(props: IChatProps) {
  const username = useAppSelector((state) => state.auth.username);
  const userAvatar = useAppSelector((state) => state.auth.avatarFilename);
  const receivers = useAppSelector((state) => state.chats.receivers);

  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage | null>(
    null
  );
  const [currentChatUser, setCurrentChatUser] = useState<string>("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string>(
    `http://localhost:5000/avatars/default.png`
  );
  const [newUser, setNewUser] = useState<string>("");
  const [textMessage, setTextMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    dispatch(init());
    socket.connect();
    socket.emit("addUser", username);
    socket.on("getMessage", (data: { senderName: string; text: string }) => {
      setArrivalMessage({
        sender: data.senderName,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.off("getMessage");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const receiver = receivers.find(
      (receiver) => receiver.receiverName === currentChatUser
    );
    if (receiver) {
      setCurrentUserAvatar(receiver.receiverAvatar);
    } else {
      setCurrentUserAvatar(`http://localhost:5000/avatars/default.png`);
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (arrivalMessage) {
      const newMessage: Message = {
        sender: arrivalMessage.sender,
        receiver: username || "",
        text: arrivalMessage.text,
        createdAt: arrivalMessage.createdAt,
        isSentBySender: false,
      };
      dispatch(addMessage(newMessage));
      dispatch(SyncReceiverAvatars(arrivalMessage.sender));
      setArrivalMessage(null);
    }
  }, [arrivalMessage]);

  const handleClickToAddUser = (e: React.SyntheticEvent) => {
    dispatch(addUser(newUser));
    dispatch(SyncReceiverAvatars(newUser));
    toggle();
    setNewUser("");
  };

  const activeModal = () => {
    toggle();
  };

  const sendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      senderName: username,
      receiverName: currentChatUser,
      text: textMessage,
    });
    const newMessage: Message = {
      sender: username || "",
      receiver: currentChatUser,
      text: textMessage,
      createdAt: Date.now(),
      isSentBySender: true,
    };
    dispatch(addMessage(newMessage));

    setTextMessage("");
  };

  return (
    <>
      <div className="chat">
        <SideBar
          username={username}
          userAvatar={`http://localhost:5000/avatars/${userAvatar}`}
          setCurrentUser={setCurrentChatUser}
          activeModal={activeModal}
        />
        {currentChatUser ? (
          <ChatArea
            userAvatar={`http://localhost:5000/avatars/${userAvatar}`}
            receiverAvatar={currentUserAvatar}
            currentChatName={currentChatUser}
            textMessage={textMessage}
            setTextMessage={setTextMessage}
            sendText={sendMessage}
          />
        ) : (
          <Welcome />
        )}
      </div>
      {createPortal(
        <Modal title="Add User" isOpen={isOpen}>
          <div className="modal-form">
            <p>Enter the username and start the conversation</p>
            <input
              type="text"
              name="username"
              required
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button className="modal-add" onClick={handleClickToAddUser}>
              Add
            </button>
            <button className="modal-cancel" onClick={() => toggle()}>
              Cancel
            </button>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}
