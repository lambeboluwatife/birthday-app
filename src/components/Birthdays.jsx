import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Birthday from "./Birthday";
import TodayBirthdays from "./TodayBirthdays";
import Button from "./Button";
import { useEffect } from "react";
import { startListeningToBirthdays } from "../slices/birthdaySlice";

const Birthdays = ({
  onAdd,
  showBirthdays,
  onDelete,
  onEditClick,
  showDeleteModal,
  showDelete,
}) => {
  const dispatch = useDispatch();
  const { birthdayFromDB, loading } = useSelector((state) => state.birthday);

  useEffect(() => {
    dispatch(startListeningToBirthdays());
  }, [dispatch]);

  if (loading) return <h5>Loading...</h5>;

  const today = moment().format("MM-DD");
  const todayBirthdays = birthdayFromDB.filter(
    (birthday) => moment(birthday.date).format("MM-DD") === today
  );

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Today's Birthday(s)</h3>
      {todayBirthdays.length > 0 ? (
        <TodayBirthdays todayBirthdays={todayBirthdays} />
      ) : (
        <p>No Birthday Today</p>
      )}
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>All Birthdays</h3>
      <Button
        color={showBirthdays ? "red" : "green"}
        text={showBirthdays ? "Close" : "Show Birthdays"}
        onClick={onAdd}
      />
      {showBirthdays &&
        birthdayFromDB.map((birthday) => (
          <Birthday
            key={birthday.id}
            birthday={birthday}
            onEditClick={onEditClick}
            onDelete={onDelete}
            showDeleteModal={showDeleteModal}
            showDelete={showDelete}
          />
        ))}
    </>
  );
};

export default Birthdays;
