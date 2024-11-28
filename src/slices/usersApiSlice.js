import { apiSlice } from "./birthdaySlice";
import { db } from "../dexie";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBirthday: builder.mutation({
      query: (data) => ({}),
    }),
  }),
});
