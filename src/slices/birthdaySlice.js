import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../dexie";
import { liveQuery } from "dexie";

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

export const updateBirthday = createAsyncThunk(
  "birthday/updateBirthday",
  async (id, updatedBirthday) => {
    return db.birthdays.update(id, updatedBirthday).then(function (updated) {
      if (updated) alert("Updated");
    });
  }
);

export const deleteBirthday = createAsyncThunk(
  "birthday/deleteBirthday",
  async (id) => {
    db.transaction("rw", db.birthdays, function () {
      return db.birthdays.delete(id);
    }).catch((err) => {
      throw err;
    });
  }
);

const birthdaySlice = createSlice({
  name: "birthday",
  initialState: { birthdayFromDB: [], loading: false, error: null },
  reducers: {
    setBirthdays: (state, action) => {
      state.birthdayFromDB = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBirthday.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBirthday.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBirthday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBirthday.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBirthday.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBirthday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBirthday.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBirthday.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBirthday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const startListeningToBirthdays = () => (dispatch) => {
  liveQuery(() => db.birthdays.toArray()).subscribe({
    next: (birthdays) => {
      dispatch(setBirthdays(birthdays));
    },
    error: (err) => {
      console.error("Error with liveQuery:", err);
    },
  });
};

export const { setBirthdays } = birthdaySlice.actions;

export default birthdaySlice.reducer;
