/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { UserContext, useContext } from "../../context/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const { data } = useContext(UserContext);

  console.log(data);

  return (
    <div id="profile-container">
      <Navbar />
      <div>Profile</div>
    </div>
  );
}

export default Profile;
