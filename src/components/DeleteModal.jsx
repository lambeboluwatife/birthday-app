const DeleteModal = ({ onDelete, showDelete, id }) => {
  console.log(id);

  return (
    <div className="delete-modal">
      <h5>Are you sure you want to delete?</h5>
      <div className="delete-options">
        <button className="delete-yes" onClick={() => onDelete(id)}>
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
