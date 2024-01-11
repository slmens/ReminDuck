/* eslint-disable no-unused-vars */
import React from "react";
import NavBar from "./NavBarComponents/Navbar";
import { Formik } from "formik";
import * as Yup from "yup";

export default function CreateReminderPage() {
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
    key: "a" + day,
    value: day,
  }));

  return (
    <>
      <NavBar />
      <div>
        <Formik
          initialValues={{
            header: "",
            desc: "",
            days: [],
          }}
          validationSchema={Yup.object({
            header: Yup.string().required(
              "You must enter the name of the person you want to call!"
            ),
            desc: Yup.string(),
            days: Yup.array().required("You should choose at least 1 day!"),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values);
            resetForm;
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            dirty,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <h3>Create Call Reminder</h3>
              <label htmlFor="header">Person to Call</label> <br />
              <input
                type="text"
                id="header"
                placeholder="John"
                name="header"
                className="input"
                value={values.header}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="desc">Description for Call Reminder</label> <br />
              <input
                type="text"
                id="desc"
                placeholder="I gotta call John about tomorrow"
                name="desc"
                className="input"
                value={values.desc}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="checkBoxDiv">Checkbox for days to remind</label>
              <br />
              <div id="checkBoxDiv">
                {checkBoxDayOptions.map((option) => {
                  return (
                    <div key={option.key} className="flex">
                      <input
                        id={option.key}
                        type="checkbox"
                        value={option.value}
                        checked={values.days.includes(option.value)}
                        onChange={() => {}}
                        className="mr-3"
                      />
                      <label htmlFor={option.key}>{option.value}</label> <br />
                    </div>
                  );
                })}
              </div>
              <button type="submit" disabled={!dirty || isSubmitting}>
                Create Call Reminder
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
