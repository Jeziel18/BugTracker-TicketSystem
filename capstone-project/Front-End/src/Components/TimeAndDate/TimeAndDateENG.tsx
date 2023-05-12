function TimeAndDate() {
  const currentDate = new Date();
  const date = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  const currentTime = new Date();
  const time = currentTime.toLocaleTimeString("en-US");
  return (
    <span>
      Date: {date} Time: {time}
    </span>
  );
}

export default TimeAndDate;
