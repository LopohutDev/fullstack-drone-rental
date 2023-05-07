import { RootState } from "./../app/store";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface CustomError {
  data: {
    isActive?: boolean;
    message: string | string[];
    otpExpiration?: string;
  };
  status: number;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + "/auth",
    prepareHeaders: (headers, { getState, endpoint }) => {
      let jwtToken;
      if (endpoint === "refresh" || endpoint === "logout") {
        jwtToken = localStorage.getItem("refreshToken");
      } else {
        jwtToken = (getState() as RootState).auth.refreshToken;
      }
      if (jwtToken) {
        headers.set("Authorization", `Bearer ${jwtToken}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: "signin",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "forgot-init",
        method: "PATCH",
        body,
      }),
    }),
    newPassword: builder.mutation({
      query: (body) => ({
        url: "forgot",
        method: "PATCH",
        body,
      }),
    }),
    verifyUser: builder.mutation({
      query: (body) => ({
        url: "verify",
        method: "PATCH",
        body,
      }),
    }),
    resendOTPVerification: builder.mutation({
      query: (body) => ({
        url: "resend-verification",
        method: "PATCH",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "refresh",
        method: "POST",
      }),
    }),
    manualRefresh: builder.mutation({
      query: (jwtToken) => ({
        url: "refresh",
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    }),
    signinGoogle: builder.query({
      query: (body) => ({
        url: `/google/callback`,
        method: "GET",
        params: body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
  useVerifyUserMutation,
  useResendOTPVerificationMutation,
  useLogoutMutation,
  useRefreshMutation,
  useLazySigninGoogleQuery,
  useSigninGoogleQuery,
  useManualRefreshMutation,
} = authApi;
