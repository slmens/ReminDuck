/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { UserContext, useContext } from "../../context/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import CallReminderCard from "../../components/CallReminderCard/CallReminderCard";
import "./Profile.css";

function Profile() {
  const { data } = useContext(UserContext);

  console.log(data);

  return (
    <div id="profile-container">
      <Navbar />
      <div id="profile-inner-container">
        <h1 id="profile-header">
          Hello, <br /> This&apos;s All Of Your Calls.
        </h1>
        <div id="profile-card-container">
          {data?.map((callReminder) => {
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
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
