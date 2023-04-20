import { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import Header from "./components/Header";
import AddBirthday from "./components/AddBirthday";
import Birthdays from "./components/Birthdays";

const App = () => {
  const [showAddBirthday, setShowAddBirthday] = useState(false);
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const getBirthdays = async () => {
      const birthdaysFromServer = await fetchBirthdays();
      setBirthdays(birthdaysFromServer);
    };
    getBirthdays();
  }, []);

  // Fetch Birthdays
  const fetchBirthdays = async () => {
    const res = await fetch("http://localhost:5000/birthdays");
    const data = await res.json();

    return data;
  };

  // Add Birthday
  const addBirthday = async (birthday) => {
    const date = moment(birthday.date).format("dddd, MMMM DD, YYYY");
    const name = birthday.name;
    const newBirthday = { name, date };

    // Check if name already exists in database
    const res = await fetch("http://localhost:5000/birthdays");
    const data = await res.json();
    const existingBirthday = data.find((bday) => bday.name === name);

    if (existingBirthday) {
      alert("Name already exists in database.");
    } else {
      // Add new birthday to database
      const res = await fetch("http://localhost:5000/birthdays", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newBirthday),
      });
      const data = await res.json();
      setBirthdays([...birthdays, data]);
    }
  };

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
            <Birthdays birthdays={birthdays} />
          ) : (
            "No Birthday Saved"
          )}
        </>
      )}
    </div>
  );
};

export default App;