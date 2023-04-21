import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddBirthday from "./components/AddBirthday";
import Birthdays from "./components/Birthdays";
import { db } from "./dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [showAddBirthday, setShowAddBirthday] = useState(false);
  const [showBirthdays, setShowBirthdays] = useState(false);
  const [birthdays, setBirthdays] = useState([]);

  const birthdaysFromDB = useLiveQuery(() => db.birthdays.toArray(), []);

  // useEffect(() => {
  //   const getBirthdays = async () => {
  //     // const birthdaysFromServer = await fetchBirthdays();
  //     setBirthdays(birthdaysFromDB);
  //   };
  //   getBirthdays();
  // }, []);

  useEffect(() => {
    setBirthdays(birthdaysFromDB);
  }, [birthdaysFromDB]);

  // Fetch Birthdays
  // const fetchBirthdays = async () => {
  //   const res = await fetch("http://localhost:5000/birthdays");
  //   const data = await res.json();
  //   return data;
  // };

  // Add Birthday
  // DexieDB
  const addBirthday = async (birthday) => {
    // const date = moment(birthday.date).format("dddd, MMMM DD, YYYY");
    const date = birthday.date;
    const name = birthday.name;

    // Check if name already exists in Dexie database
    const birthdays = await db.birthdays.toArray();
    console.log(birthdays);

    const existingBirthday = birthdays.find((bday) => bday.name === name);

    if (existingBirthday) {
      alert(`${name} already exists in database`);
    } else {
      // Add the new birthday!
      await db.birthdays.add({
        name,
        date,
      });
    }
  };

  console.log(birthdays);

  // Add Birthday
  // json-server
  // const addBirthday = async (birthday) => {
  //   const date = moment(birthday.date).format("dddd, MMMM DD, YYYY");
  //   const name = birthday.name;
  //   const newBirthday = { name, date };

  //   // Check if name already exists in database
  //   const res = await fetch("http://localhost:5000/birthdays");
  //   const data = await res.json();
  //   const existingBirthday = data.find((bday) => bday.name === name);

  //   if (existingBirthday) {
  //     alert("Name already exists in database.");
  //   } else {
  //     // Add new birthday to database
  //     const res = await fetch("http://localhost:5000/birthdays", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(newBirthday),
  //     });
  //     const data = await res.json();
  //     setBirthdays([...birthdays, data]);
  //   }
  // };

  // Add Birthday
  // Default
  // const addBirthday = async (birthday) => {
  // const id = Math.floor(Math.random() * 10000) + 1;
  // const date = moment(birthday.date).format("dddd, MMMM DD, YYYY");
  // const name = birthday.name;
  // const newBirthday = { id, name, date };
  // birthdays.filter((birthday) => {
  //   if (newBirthday.name.toLowerCase() === birthday.name.toLowerCase()) {
  //     alert(`${newBirthday.name} already exists`);
  //     setBirthdays(birthdays);
  //   } else {
  //     setBirthdays([...birthdays, newBirthday]);
  //   }
  // });
  // };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddBirthday(!showAddBirthday)}
        showAdd={showAddBirthday}
      />
      {!birthdays ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
        <>
          {showAddBirthday && (
            <AddBirthday birthdays={birthdays} onAdd={addBirthday} />
          )}
          {birthdays.length > 0 ? (
            <Birthdays
              birthdays={birthdays}
              onAdd={() => setShowBirthdays(!showBirthdays)}
              showBirthdays={showBirthdays}
            />
          ) : (
            "No Birthday Saved"
          )}
        </>
      )}
      <Analytics />
    </div>
  );
};

export default App;
