import moment from "moment";
const Birthday = ({ birthday }) => {
  return (
    <>
      <div className="birthday">
        <h4>{birthday.name}</h4>
        <p>{moment(birthday.date).format("dddd, MMMM DD, YYYY")}</p>
      </div>
    </>
  );
};

export default Birthday;
