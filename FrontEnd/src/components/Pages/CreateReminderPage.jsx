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

export default function CreateReminderPage({ reRender }) {
  const { id } = useParams();

  const [values, setValues] = useState({
    id: "",
    whoToCall: "",
    description: "",
    callReminderDays: [],
    callReminderTime: "10:00",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/callReminder/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      console.log("reminder updated");
    });

    setSubmitSuccess(true);

    reRender();

    history.push("/");
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:8080/callReminder/${id}`)
      .then((response) =>
        setValues({
          id: `${response.data.id}`,
          whoToCall: `${response.data.whoToCall}`,
          description: `${response.data.description}`,
          callReminderDays: `${response.data.callReminderDays}`,
          callReminderTime: `${response.data.callReminderTime}`,
        })
      )
      .catch((error) => console.log({ error }));
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchData();
    }

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
    }
  }, [submitSuccess]);

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

  console.log(values);

  return (
    <div className="h-screen bg-black">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center text-center bg-black">
        <div className="py-[40px] px-[40px] flex flex-col items-center rounded-lg border-2 border-primary-color justify-center bg-white">
          <h1 className="mb-5 text-4xl font-bold">
            {id === undefined ? "Create Call Reminder" : "Update Call reminder"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div id="NameDiv" className="flex flex-col">
              <label htmlFor="whoToCall" className="mb-3 text-1xl font-bold">
                Person to Call
              </label>
              <input
                type="text"
                name="whoToCall"
                placeholder={id === undefined ? "Name" : {}}
                id="whoToCall"
                required={true}
                value={values.whoToCall}
                onChange={onChange}
                maxLength={60}
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
              <label className="text-1xl font-bold">
                Days to Call Reminder
              </label>
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
