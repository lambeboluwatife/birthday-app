import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";

const Birthday = ({ birthday, onDelete, onEditClick }) => {
  return (
    <>
      <div className="birthday">
        <h4>
          {birthday.name}

          <FontAwesomeIcon
            icon={faRemove}
            style={{ float: "right", paddingLeft: "20px", color: "red" }}
            onClick={() => onDelete(birthday.id)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            style={{ float: "right", color: "green" }}
            onClick={() => onEditClick(birthday.id)}
          />
        </h4>
        <p>{moment(birthday.date).format("dddd, MMMM DD, YYYY")}</p>
      </div>
    </>
  );
};

export default Birthday;
