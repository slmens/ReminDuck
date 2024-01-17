/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../NavBarComponents/Navbar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

export default function CreateReminderPage({ setCallReminders, data }) {
  const { id } = useParams();

  const [values, setValues] = useState({
    id: "",
    whoToCall: "Name",
    description: "",
    callReminderDays: [],
    callReminderTime: "10:00",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const history = useHistory();

  // These 3 methods are for creating checkboxes
  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const checkBoxDayOptions = daysOfWeek.map((day) => ({
    key: "key" + day,
    value: day,
  }));

  // Method for handle creating the call reminders
  const handleCreate = (e) => {
    e.preventDefault();
    const reminderToCreate = {
      whoToCall: values.whoToCall,
      description: values.description,
      callReminderDays: values.callReminderDays,
      callReminderTime: values.callReminderTime,
    };

    fetch(`http://localhost:8080/callReminder/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminderToCreate),
    })
      .then(() => {
        console.log("Reminder created");
      })
      .catch((error) => {
        console.error("Error creating reminder:", error);
      });

    setSubmitSuccess(true);

    setCallReminders();

    history.push("/");
  };

  // Method for handle updating the call reminders
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/callReminder/${id}`, values)
      .then((response) => {
        console.log("Reminder updated");
      })
      .catch((error) => {
        console.warn(error);
      });

    setSubmitSuccess(true);

    setCallReminders();

    history.push("/");
  };

  useEffect(() => {
    if (id !== undefined && !submitSuccess) {
      const reminderToUpdate = data.find((reminder) => reminder.id == id);

      if (reminderToUpdate) {
        setValues({
          id: reminderToUpdate.id,
          whoToCall: reminderToUpdate.whoToCall,
          description: reminderToUpdate.description,
          callReminderDays: reminderToUpdate.callReminderDays,
          callReminderTime: reminderToUpdate.callReminderTime,
        });
      }
    }

    /*
    if (submitSuccess) {
      const timeoutId = setTimeout(() => {
        setValues({
          id: "",
          whoToCall: "",
          description: "",
          callReminderDays: [],
          callReminderTime: "10:00",
        });
        setSubmitSuccess(false);
      }, 500);

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    } */
  }, [id, data, submitSuccess]);

  // If id is undefined then it means we are on create / if id is not undefined we are on update
  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (id === undefined) {
      if (name === "callReminderTime") {
        setValues({ ...values, [name]: value });
      } else if (type === "checkbox") {
        setValues((prevValues) => ({
          ...prevValues,
          callReminderDays: checked
            ? [...prevValues.callReminderDays, name]
            : prevValues.callReminderDays.filter((day) => day !== name),
        }));
      } else {
        setValues({ ...values, [name]: value });
      }
    } else {
      if (name === "callReminderTime") {
        setValues({ ...values, [name]: value });
        console.log(values);
      } else if (type === "checkbox") {
        setValues((prevValues) => {
          const currentDays = prevValues.callReminderDays || [];
          const updatedDays = checked
            ? [...currentDays, name]
            : currentDays.filter((day) => day !== name);

          return { ...prevValues, callReminderDays: updatedDays };
        });
      } else {
        setValues({ ...values, [name]: value });
      }
    }
  };

  const checkboxes = checkBoxDayOptions.map((day) => (
    <div key={day.key}>
      <input
        type="checkbox"
        id={day.key}
        name={day.value}
        checked={values.callReminderDays.includes(day.value)}
        onChange={onChange}
      />
      <label htmlFor={day.key} className="mx-3">
        {day.value}
      </label>
    </div>
  ));

  return (
    <div className="h-screen bg-black">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center text-center bg-black">
        <div className="py-[40px] px-[40px] flex flex-col items-center rounded-lg border-2 border-primary-color justify-center bg-white">
          <h1 className="mb-5 text-4xl font-bold">
            {id === undefined ? "Create Call Reminder" : "Update Call reminder"}
          </h1>
          <form onSubmit={id === undefined ? handleCreate : handleUpdate}>
            <div id="NameDiv" className="flex flex-col">
              <label htmlFor="whoToCall" className="mb-3 text-1xl font-bold">
                Person to Call
              </label>
              <input
                type="text"
                name="whoToCall"
                placeholder={"Name"}
                id="whoToCall"
                required={true}
                value={values.whoToCall}
                onChange={onChange}
                maxLength={40}
                className="w-60 h-14 rounded border-2 border-primary-color p-2"
              />
            </div>
            <div id="descDiv" className="flex flex-col">
              <label
                htmlFor="description"
                className="mb-3 mt-4 text-1xl font-bold"
              >
                Description for Call
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                required={true}
                value={values.description}
                onChange={onChange}
                maxLength={150}
                className="w-60 h-40 rounded border-2 border-primary-color p-2 resize-none"
              />
            </div>
            <div id="checkboxDiv" className="mt-5 mb-5">
              <h3>Days to Call Reminder</h3>
              {checkboxes}
            </div>

            <div id="last" className="flex flex-col">
              <TimePicker
                id="callReminderTime"
                onChange={(time) =>
                  onChange({
                    target: { name: "callReminderTime", value: time },
                  })
                }
                value={values.callReminderTime}
              />

              <button
                type="submit"
                name={id === undefined ? "Create" : "Update"}
                className="py-2 px-12 rounded-lg border-4 border-primary-color mt-5"
              >
                {id === undefined ? "Submit" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
