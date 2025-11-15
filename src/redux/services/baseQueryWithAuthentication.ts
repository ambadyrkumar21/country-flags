import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryWithoutAuthentication = fetchBaseQuery({
    baseUrl: "https://restcountries.com",
    prepareHeaders: (headers, { getState}) => {
        const accessToken = (getState() as any).auth.accessToken;
        if(accessToken){
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return headers;
    }
})