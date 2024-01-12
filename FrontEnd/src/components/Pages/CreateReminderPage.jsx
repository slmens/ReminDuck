/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import NavBar from "../NavBarComponents/Navbar";
import * as Yup from "yup";
import FormInput from "./components/FormInput";

export default function CreateReminderPage() {
  const [values, setValues] = useState({
    name: "",
    desc: "",
    days: [],
    time: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const checkBoxDayOptions = daysOfWeek.map((day) => ({
    key: "key" + day,
    value: day,
  }));

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Person to Call",
      errorMessage:
        "Person to call should be 2-32 characters and shouldn't include any special character!",
      label: "Person to Call",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "desc",
      type: "text",
      placeholder: "Description",
      errorMessage: "",
      label: "Description",
      required: false,
    },
    {
      id: 3,
      name: "days",
      type: "checkbox",
      checked: false,
      errorMessage: "",
      label: "Days to Call",
      required: true,
    },
    /*{
      id: 4,
      name: "time",
      type: "date",
      errorMessage: "",
      label: "Time to Call",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: false,
  },*/
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      /* API CALL */
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavBar />
      <div className="">
        <form onSubmit={handleSubmit}>
          <h1>Create Call Reminder</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
