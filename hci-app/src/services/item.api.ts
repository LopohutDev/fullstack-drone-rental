import { Item } from "../models/item.model";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface CustomError {
  data: {
    message: [string];
  };
}

interface Items {
  data: Item[];
  skip: number;
  take: number;
  count: number;
}

interface Query {
  skip?: number;
  take?: number;
  search?: string;
}

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + "/item",
  }) as BaseQueryFn<FetchArgs, unknown, CustomError>,
  tagTypes: ["Items", "Item"],
  endpoints: (builder) => ({
    getItems: builder.query<Items, Query>({
      query: ({ take, skip, search }) => {
        return {
          url: "/",
          params: {
            skip,
            take,
            search,
          },
        };
      },
      providesTags: ["Items"],
    }),
    getItem: builder.query<Item, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Item"],
    }),
  }),
});

export const { useGetItemQuery, useGetItemsQuery } = itemApi;
