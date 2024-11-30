import { deleteBirthday } from "../slices/birthdaySlice";
import { useDispatch } from "react-redux";
const DeleteModal = ({ showDelete, id }) => {
  const dispatch = useDispatch();

  // const handleDelete = () => {
  //   dispatch(deleteBirthday(id));
  //   showDelete();
  // };
  return (
    <div className="delete-modal">
      <h5>Are you sure you want to delete?</h5>
      <div className="delete-options">
        <button
          className="delete-yes"
          onClick={() => dispatch(deleteBirthday(id))}
        >
          Yes
        </button>
        <button className="delete-no" onClick={showDelete}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
