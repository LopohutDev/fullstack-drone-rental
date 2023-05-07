import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "../../app/store";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface SetUser {
  email?: string;
  password?: string;
  signInhandleSubmit?: any;
  isModal?: boolean;
}
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  userDetail: SetUser | null;
}

export interface SetUserPayload {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  userDetail: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<SetUserPayload>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      const decode = jwtDecode<User>(refreshToken);
      state.user = {
        email: decode.email,
        firstName: decode.firstName,
        lastName: decode.lastName,
      };
    },
    setUserDetail: (state: AuthState, action: PayloadAction<SetUser>) => {
      state.userDetail = action.payload;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    defaultState: (state: AuthState) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState, logout, setUserDetail } =
  authSlice.actions;
export const authSelect = (state: RootState) => state.auth;

export default authSlice.reducer;
