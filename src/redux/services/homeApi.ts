import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutAuthentication } from "./baseQueryWithAuthentication";

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: baseQueryWithoutAuthentication,
    tagTypes: [ 'Home' ],
    endpoints: (builder) => ({
        getCountryData: builder.query<any, void>({
            query: ()=> "/v2/all?fields=name,region,flag",
            providesTags: ['Home']
        })
    })
});

export const { useGetCountryDataQuery } = homeApi;