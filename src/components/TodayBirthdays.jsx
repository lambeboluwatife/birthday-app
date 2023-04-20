const TodayBirthdays = ({ todayBirthdays }) => {
  return (
    <>
      {todayBirthdays.map((birthday) => (
        <div className="birthday today" key={birthday.id}>
          <h4>{birthday.name}</h4>
          <p>{birthday.date}</p>
        </div>
      ))}
    </>
  );
};

export default TodayBirthdays;
