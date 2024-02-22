/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar/Navbar";
import { fecthAllCards } from "../../service/CardReminderService.js";
import "./Profile.css";

function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allCards"],
    queryFn: () => fecthAllCards(),
    onSuccess: (data) => console.log(data),
  });

  console.log(data);
  return (
    <div id="profile-container">
      <Navbar />
      <div>Profile</div>
    </div>
  );
}

export default Profile;
