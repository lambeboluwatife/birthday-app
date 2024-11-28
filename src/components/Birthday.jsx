import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./DeleteModal";

const Birthday = ({
  birthday,
  onDelete,
  onEditClick,
  showDeleteModal,
  showDelete,
}) => {
  return (
    <>
      <div className="birthday">
        <h4>
          {birthday.name}

          {showDeleteModal && (
            <DeleteModal
              onDelete={onDelete}
              showDelete={showDelete}
              id={birthday.id}
            />
          )}

          <FontAwesomeIcon
            icon={faRemove}
            style={{ float: "right", paddingLeft: "20px", color: "red" }}
            onClick={showDelete}
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
