/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import NavBar from "../NavBarComponents/Navbar";
import Card from "../ReusableComponents/CallReminderCard";

export default function Home({ data, fetchUserData, fetchDataAndSetToday }) {
  let name = " ";
  useEffect(() => {
    name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    if (name === null) {
      fetchUserData();
    }

    // call remindera id yazmıyor
    // id bazen null oluyor
    // bazen name null oluyor
    // sesion storage kullan eğer session storageda varsa çekme de bu sayede gereksiz api calların önüne geçersin
    // create yapamıyorum forbbiden veriyor
    if (id !== " " || id !== null) {
      fetchDataAndSetToday();
    }
  }, []);

  return (
    <div className="h-screen min-h-full bg-black">
      <NavBar />
      <div className="flex flex-col items-center bg-black pb-12">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello {name}, <br /> That&apos;s All For Today&apos;s Calls. <br />{" "}
          Have a Great One!
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
