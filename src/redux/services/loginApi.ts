import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/"}),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query : (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;