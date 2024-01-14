/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NavBar from "../NavBarComponents/Navbar";
import Card from "../ReusableComponents/CallReminderCard";
import axios from "axios";

export default function Profile({ data }) {
  return (
    <div className="h-screen min-h-full bg-black">
      <NavBar />
      <div className="flex flex-col items-center bg-black pb-12">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello Name, <br /> This&apos;s All Of Your Calls.
        </h1>
        <div className="grid grid-cols-2 gap-14 mt-14">
          {data.map((callReminder) => {
            return (
              <Card
                key={callReminder.id}
                id={callReminder.id}
                header={callReminder.whoToCall}
                desc={callReminder.description}
                dateTime={callReminder.callReminderTime}
                days={callReminder.callReminderDays}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
