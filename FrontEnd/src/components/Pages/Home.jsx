/* eslint-disable no-unused-vars */
import React from "react";
import Card from "../ReusableComponents/CallReminderCard";
import NavBar from "../NavBarComponents/Navbar";

export default function Home() {
  return (
    <div className="h-screen bg-black">
      <NavBar />
      <div className="flex flex-col items-center">
        <h1 className="text-white text-center font-sans font-bold text-3xl">
          Hello Name, <br /> That&apos;s All For Today&apos;s Calls. <br /> Have
          a Great One!
        </h1>
        <div className="grid grid-cols-2 gap-14 mt-14">
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
          <Card
            header="OMG BRO"
            desc="YEAH LOREM BİLMEM NE"
            dateTime="14 Oct 01 PM"
          />
        </div>
      </div>
    </div>
  );
}
