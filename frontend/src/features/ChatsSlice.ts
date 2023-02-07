import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  sender: string;
  receiver: string;
  text: string;
  createdAt: number;
  isSentBySender: boolean;
}

export interface Receiver {
  receiverName: string;
  receiverAvatar: string;
}

export interface Chat {
  receivers: Receiver[];
  messages: Message[];
}

export const SyncReceiverAvatars = createAsyncThunk(
  "chats/syncAvatars",
  async (newUser: string, thunkAPI) => {
    const res = await fetch(
      `http://localhost:5000/misc/getUserAvatar/${newUser}`
    );
    if (!res.ok) throw new Error("No User");
    const data = (await res.json()) as { avatarFilename: string };
    return { username: newUser, avatarFilename: data.avatarFilename };
  }
);

const initialState: Chat = {
  receivers: [],
  messages: [],
};

const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    init: (state) => {
      state = {
        receivers: [],
        messages: [],
      };
    },
    addUser: (state, action: PayloadAction<string>) => {
      const newReceiver: Receiver = {
        receiverName: action.payload,
        receiverAvatar: "http://localhost:5000/avatars/default.png",
      };
      state.receivers.push(newReceiver);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const partner = action.payload.isSentBySender
        ? action.payload.receiver
        : action.payload.sender;
      const partnerPos = state.receivers.findIndex(
        (receiver) => receiver.receiverName === partner
      );
      if (partnerPos === -1) {
        const newUser: Receiver = {
          receiverName: partner,
          receiverAvatar: "http://localhost:5000/avatars/default.png",
        };
        state.receivers.push(newUser);
      }
      state.messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(SyncReceiverAvatars.fulfilled, (state, action) => {
      const newUser = state.receivers.find(
        (user) => user.receiverName === action.payload.username
      );
      if (newUser) {
        newUser.receiverAvatar = `http://localhost:5000/avatars/${action.payload.avatarFilename}`;
      }
    });
  },
});

export const { init, addUser, addMessage } = ChatsSlice.actions;

export default ChatsSlice.reducer;
