import { useState } from "react";
import { addBirthday } from "../slices/birthdaySlice";
import { useDispatch } from "react-redux";

const AddBirthday = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a name");
      return;
    }

    if (!date) {
      alert("Please add a birthdate");
      return;
    }

    dispatch(addBirthday({ name, date }));

    setName("");
    setDate("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Birthday Date</label>
        <input
          type="date"
          placeholder="Add Birthday Date (Format: MM/DD/YYYY)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <input type="submit" value="Save Birthday" className="btn btn-block" />
    </form>
  );
};

export default AddBirthday;
