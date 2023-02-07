import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "../features/AuthSlice";
import ChatsSlice from "../features/ChatsSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    chats: ChatsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
