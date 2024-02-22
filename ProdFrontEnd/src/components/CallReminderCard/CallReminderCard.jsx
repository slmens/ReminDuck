/*
import React, { useState } from "react";
import "./CallReminderCard.css";
import { useHistory } from "react-router-dom";

function CallReminderCard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("au");
  const trimmedToken = token.substring(1, token.length - 1);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    // Implement your edit logic here
    setShowDropdown(!showDropdown);
    history.push(`/create/${props.id}`);
  };

  const handleDelete = () => {
    const handleDelete = async () => {
      try {
        // Implement your delete logic here
        await axios.delete(`http://localhost:8080/callReminder/${props.id}`, {
          headers: {
            Authorization: `Bearer ${trimmedToken}`,
          },
        });

        // Show an alert after successful deletion
        alert("Call Reminder Deleted!");

        // Reload the page or fetch updated data
        window.location.reload();
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error("Error deleting data", error);
      }
    };

    handleDelete();

    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white w-96 h-40 rounded-2xl p-6 border-4 border-primary-color flex flex-col items-center justify-around relative">
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-xl font-bold">{props.header}</h1>
        <div className="relative inline-block">
          <button onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faEllipsis} className="text-3xl" />
          </button>

          {showDropdown && (
            <div className="absolute z-10 right-0 mt-2 bg-white border rounded-md shadow-lg">
              <button
                onClick={handleEdit}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="text-sm mb-8">{props.desc}</p>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendarDays} />
          <h2 className="ml-2 text-sm">{props.dateTime}</h2>
          <div className="flex flex-row justify-end w-full flex-wrap">
            {props.days.map((day) => {
              return (
                <h3 className="text-xs ml-2" key={day}>
                  {day}
                </h3>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


export default CallReminderCard;
*/
