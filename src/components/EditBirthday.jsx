import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { updateBirthday } from "../slices/birthdaySlice";
import { useDispatch } from "react-redux";

const EditBirthday = ({ currentBirthday, onUpdate, isEditing }) => {
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
      alert("Please add a date");
      return;
    }

    dispatch(updateBirthday(currentBirthday.id, { name, date }));

    // onUpdate(currentBirthday.id, { name, date });
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h5 style={{ textAlign: "center" }}>Edit Birthday</h5>
      <div className="form-control">
        <label>
          Name
          <FontAwesomeIcon
            icon={faRemove}
            style={{ color: "red", float: "right" }}
            onClick={isEditing}
          />
        </label>
        <input
          type="text"
          defaultValue={currentBirthday.name}
          onChange={(e) => setName(e.target.defaultValue)}
        />
      </div>

      <div className="form-control">
        <label>Birthday Date</label>
        <input
          type="date"
          defaultValue={currentBirthday.date}
          onChange={(e) => setDate(e.target.defaultValue)}
        />
      </div>

      <input type="submit" value="Edit Birthday" className="btn btn-block" />
    </form>
  );
};

export default EditBirthday;
