import Dexie from "dexie";

export const db = new Dexie("birthdayReminder");
db.version(1).stores({
  birthdays: "++id,name,date",
});
