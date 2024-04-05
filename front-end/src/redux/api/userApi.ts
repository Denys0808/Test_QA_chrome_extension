import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { IUser, IGetmeResponse, IGenericResponse } from "./types";
import { object, string, TypeOf } from "zod";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

const profileSchema = object({
  school: string().min(1, "School information is required").max(100),
  grade: string().min(1, "School information is required").max(100),
  instgram: string().min(1, "School information is required").max(100)
});
type ProfileInput = TypeOf<typeof profileSchema>;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "me",
          credentials: "include",
        };
      },
      transformResponse: (result: IGetmeResponse) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) { }
      },
    }),
    completeProfile: builder.mutation<IGenericResponse, ProfileInput>({
      query(data) {
        return {
          url: "profile",
          method: "POST",
          body: data
          // credentials: "include"
        };
      },
    })
  }),
});

export const {
  useCompleteProfileMutation
} = userApi;