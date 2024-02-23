/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./CallReminderCard.css";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../../service/CardReminderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function CallReminderCard(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    // Implement your edit logic here
    setShowDropdown(!showDropdown);
    history.push(`/create/${props.id}`);
  };

  const handleDelete = () => {
    deleteCard(props.id);

    setShowDropdown(!showDropdown);
  };

  return (
    <div id="call-reminder-card-container">
      <div id="card-top">
        <h1 id="card-header">{props.header}</h1>
        <div id="card-icon-container">
          <button onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>

          {showDropdown && (
            <div id="dropdown-container">
              <button onClick={handleEdit} className="btn-card-top">
                Edit
              </button>
              <button onClick={handleDelete} className="btn-card-top">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="card-bottom">
        <p id="card-desc">{props.desc}</p>
        <div id="card-bottom-time-container">
          <FontAwesomeIcon icon={faCalendarDays} />
          <h2 id="card-bottom-time">{props.dateTime}</h2>
          <div id="card-bottom-days">
            {props.days?.map((day) => {
              return (
                <h3 className="card-reminder-day" key={day}>
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
