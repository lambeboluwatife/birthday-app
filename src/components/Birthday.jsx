import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Birthday = ({ birthday, onDelete }) => {
  return (
    <>
      <div className="birthday">
        <h4>
          {birthday.name}
          <FontAwesomeIcon
            icon={faEdit}
            style={{ float: "right", paddingLeft: "5px", color: "red" }}
            onClick={() => onDelete(birthday.id)}
          />
        </h4>
        <p>{moment(birthday.date).format("dddd, MMMM DD, YYYY")}</p>
      </div>
    </>
  );
};

export default Birthday;
