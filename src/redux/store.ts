import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./services/loginApi";
import { homeApi } from "./services/homeApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware, homeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;