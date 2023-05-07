// import { userApi } from "./../services/user.api";
// import { eventApi } from "./../services/event.api";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/Authentication/authSlice";
// import paymentReducer from "../features/Payment/paymentSlice";
import { authApi } from "../services/auth.api";
import { itemApi } from "../services/item.api";
// import { paymentApi } from "../services/payment.api";
// import eventReducer from "../features/Event/SelectedEvent/eventSlice";
// import { orderApi } from "../services/order.api";
// import { bannerApi } from "../services/banner.api";
// import { artistApi } from "../services/artist.api";
// import { healthApi } from "../services/health.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, itemApi.middleware),
});

// selectedEvent: eventReducer,
// [authApi.reducerPath]: authApi.reducer,
// [orderApi.reducerPath]: orderApi.reducer,
// payment: paymentReducer,
// [paymentApi.reducerPath]: paymentApi.reducer,
// [artistApi.reducerPath]: artistApi.reducer,
// [eventApi.reducerPath]: eventApi.reducer,
// [userApi.reducerPath]: userApi.reducer,
// [bannerApi.reducerPath]: bannerApi.reducer,
// [healthApi.reducerPath]: healthApi.reducer,

//   orderApi.middleware,
//   paymentApi.middleware,
//   eventApi.middleware,
//   artistApi.middleware,
//   userApi.middleware,
//   bannerApi.middleware,
//   healthApi.middleware

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
