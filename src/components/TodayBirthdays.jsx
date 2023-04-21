import moment from "moment";

const TodayBirthdays = ({ todayBirthdays }) => {
  return (
    <>
      {todayBirthdays.map((birthday) => (
        <div className="birthday today" key={birthday.id}>
          <h4>{birthday.name}</h4>
          <p>{moment(birthday.date).format("dddd, MMMM DD, YYYY")}</p>
        </div>
      ))}
    </>
  );
};

export default TodayBirthdays;
