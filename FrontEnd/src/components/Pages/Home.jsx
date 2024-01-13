/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Card from "../ReusableComponents/CallReminderCard";
import NavBar from "../NavBarComponents/Navbar";
import axios from "axios";

export default function Home() {
  const [callReminders, setCallReminders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/callReminder")
        .then((response) => setCallReminders(response.data))
        .catch((error) => console.log({ error }));
    };

    fetchData();

    return () => {
      // Any cleanup code you want to run when the component unmounts
    };
  }, []);

  console.log(callReminders);

  return (
    <div className="h-screen bg-black">
      <NavBar />
      <div className="flex flex-col items-center">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello Name, <br /> That&apos;s All For Today&apos;s Calls. <br /> Have
          a Great One!
        </h1>
        <div className="grid grid-cols-2 gap-14 mt-14">
          {callReminders.map((callReminder) => {
            return (
              <Card
                key={callReminder.id}
                header={callReminder.whoToCall}
                desc={callReminder.description}
                dateTime={callReminder.callReminderTime}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
