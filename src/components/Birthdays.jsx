import moment from "moment";
import Birthday from "./Birthday";
import TodayBirthdays from "./TodayBirthdays";
import Button from "./Button";

const Birthdays = ({ birthdays, onAdd, showBirthdays }) => {
  const today = moment().format("MMMM DD");

  const todayBirthdays = birthdays.filter(
    (birthday) => moment(birthday.date).format("MMMM DD") === today
  );

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Today's Birthday(s)</h3>
      {todayBirthdays.length > 0 ? (
        <TodayBirthdays todayBirthdays={todayBirthdays} />
      ) : (
        "No Birthday Today"
      )}
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>All Birthdays</h3>

      <Button
        color={showBirthdays ? "red" : "green"}
        text={showBirthdays ? "Close" : "Show Birthdays"}
        onClick={onAdd}
      />
      {showBirthdays &&
        birthdays.map((birthday) => (
          <Birthday key={birthday.id} birthday={birthday} />
        ))}
    </>
  );
};

export default Birthdays;
