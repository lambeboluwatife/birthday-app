import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../dexie";

export const fetchBirthdays = createAsyncThunk(
  "birthday/fetchBirthdays",
  async () => {
    const birthdays = await db.birthdays.toArray();
    return birthdays;
  }
);

export const addBirthday = createAsyncThunk(
  "birthday/addBirthday",
  async ({ name, date }) => {
    const birthdays = await db.birthdays.toArray();

    const existingBirthday = birthdays.find((bday) => bday.name === name);

    if (existingBirthday) {
      return `${name} already exists in database`;
    } else {
      await db.birthdays.add({
        name,
        date,
      });

      return { name, date };
    }
  }
);

const birthdaySlice = createSlice({
  name: "birthday",
  initialState: { birthdayFromDB: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBirthdays.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBirthdays.fulfilled, (state, action) => {
        state.loading = false;
        state.birthdayFromDB = action.payload;
      })
      .addCase(fetchBirthdays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBirthday.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBirthday.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBirthday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const apiSlice = createApi({
//   tagTypes: ["Birthday"],
//   endpoints: (builder) => ({}),
// });

export default birthdaySlice.reducer;
