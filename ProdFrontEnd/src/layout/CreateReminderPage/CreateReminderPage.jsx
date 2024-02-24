/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import { UserContext, useContext } from "../../context/UserContext";
import handleCreate from "../../util/CreateCard";
import handleUpdate from "../../util/UpdateCard";
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./CreateReminderPage.css";

function CreateReminderPage() {
  const { setIsUpdated, isUpdated } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const { data } = useContext(UserContext);
  const [values, setValues] = useState({
    id: "",
    whoToCall: "",
    description: "",
    callReminderDays: [],
    callReminderTime: "10:00",
  });

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

  const create = async (e) => {
    if (values.callReminderDays.length === 0) {
      alert("Please select a day to remind you to call");
    } else {
      await handleCreate(e, values, history);
      setIsUpdated(true);
      history.push("/home");
    }
  };

  const update = async (e) => {
    if (values.callReminderDays.length === 0) {
      alert("Please select a day to remind you to call");
    } else {
      await handleUpdate(e, values, history);
      setIsUpdated(true);
      history.push("/home");
    }
  };

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
    <div key={day.key} className="create-checkbox-container">
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

  useEffect(() => {
    if (id !== undefined) {
      if (data !== undefined) {
        const reminderToUpdate = data.find((reminder) => reminder.id === id);

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
    }
  }, [id, data]);

  return (
    <div id="page-container">
      <Navbar />
      <div id="create-container">
        <div id="create-inner-container">
          <h1 id="create-header">
            {id === undefined ? "Create Call Reminder" : "Update Call reminder"}
          </h1>
          <form
            id="form-container"
            onSubmit={id === undefined ? create : update}
          >
            <div id="NameDiv">
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
                className="create-input"
              />
            </div>
            <div id="descDiv" className="flex flex-col">
              <label htmlFor="description">Description for Call</label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                required={true}
                value={values.description}
                onChange={onChange}
                maxLength={150}
                className="create-input"
              />
            </div>
            <div id="checkboxDiv">
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
                id="create-button"
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

export default CreateReminderPage;
