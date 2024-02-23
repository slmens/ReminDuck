/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import { UserContext, useContext } from "../../context/UserContext";
import CallReminderCard from "../../components/CallReminderCard/CallReminderCard";
import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const { data } = useContext(UserContext);
  const [currentDay, setCurrentDay] = useState("");

  const setToday = () => {
    const today = new Date();
    const options = { weekday: "long" };
    setCurrentDay(today.toLocaleDateString("en-US", options).toUpperCase());
  };

  useEffect(() => {
    setToday();
  }, []);

  return (
    <div id="home-container">
      <Navbar />
      <div id="home-inner-container">
        <h1 id="home-header">
          Hello, <br /> This&apos;s All Of Your Calls For Today.
        </h1>
        <div id="home-card-container">
          {data?.map((callReminder) => {
            console.log(callReminder.callReminderDays);
            console.log(currentDay);
            if (callReminder.callReminderDays.includes(currentDay)) {
              return (
                <CallReminderCard
                  key={callReminder.id}
                  id={callReminder.id}
                  header={callReminder.whoToCall}
                  desc={callReminder.description}
                  dateTime={callReminder.callReminderTime}
                  days={callReminder.callReminderDays}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
