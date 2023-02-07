import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  username: string | null;
  isLogin: boolean;
  avatarFilename: string | null;
  userId: string | null;
  isPending: boolean;
  error: string | null;
}

interface ErrorResponseData {
  success: boolean;
  msg: string;
}

interface SuccessResponseData {
  success: boolean;
  user: {
    _id: string;
    username: string;
    avatarFilename: string;
  };
}

const initialState: AuthState = {
  username: null,
  isLogin: false,
  avatarFilename: null,
  userId: null,
  isPending: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (urlencodedData: URLSearchParams) => {
    const res = await fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      credentials: "same-origin",
      body: urlencodedData,
    });
    if (!res.ok) {
      const data: ErrorResponseData = (await res.json()) as ErrorResponseData;
      throw new Error(data.msg);
    }
    const data: SuccessResponseData = (await res.json()) as SuccessResponseData;
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await fetch("http://127.0.0.1:5000/auth/logout", {
    method: "GET",
    credentials: "same-origin",
  });
  if (!res.ok) {
    const data: ErrorResponseData = (await res.json()) as ErrorResponseData;
    throw new Error(data.msg);
  }
  return;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(logout.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userId = action.payload.user._id;
      state.username = action.payload.user.username;
      state.avatarFilename = action.payload.user.avatarFilename;
      state.isLogin = true;
      state.isPending = false;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.userId = null;
      state.username = null;
      state.avatarFilename = null;
      state.isLogin = false;
      state.isPending = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ? action.error.message : null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export default AuthSlice.reducer;
