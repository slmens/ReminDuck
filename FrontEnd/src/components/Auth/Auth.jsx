/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

export default function Auth() {
  const [createUserForm, setCreateUserForm] = useState({
    username: "",
    password: "",
    mail: "",
  });

  const [passwordChecker, setPasswordChecker] = useState("");

  const [logInUserForm, setLogInUserForm] = useState({
    username: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(true);

  const handleRegister = (e) => {
    if (passwordChecker === createUserForm.password) {
      console.log(createUserForm);
      sendRequest("signUp", e);
    }
  };

  const handleLogIn = (e) => {
    // api call
    sendRequest("signIn", e);
  };

  const onChangeRegister = (e) => {
    const { name, type, value } = e.target;

    if (name === "passwordChecker") {
      setPasswordChecker(value);
    } else {
      setCreateUserForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onChangeLogIn = (e) => {
    const { name, type, value } = e.target;

    setLogInUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function sendRequest(actionType, event) {
    event.preventDefault();
    if (actionType === "signUp") {
      axios
        .post("http://localhost:8080/user/signUp", { createUserForm })
        .then((res) => {
          console.log(res);
        })
        .then()
        .catch((e) => {});
    } else if (actionType === "signIn") {
      axios
        .post("http://localhost:8080/user/signIn", { logInUserForm })
        .then((res) => {
          console.log(res);
        })
        .then()
        .catch((e) => {});
    }
  }

  function toggleForm() {
    setIsRegister(!isRegister);
  }

  const registerForm = (
    <div>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mb-5 text-white text-5xl font-bold">Create Account</h2>
          <label htmlFor="mail" className="mb-3 text-1xl font-bold text-white">
            Mail
          </label>
          <input
            type="email"
            name="mail"
            placeholder="example@gmail.com"
            required={true}
            value={createUserForm.mail}
            onChange={onChangeRegister}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label
            htmlFor="username"
            className="mb-3 mt-3 text-1xl font-bold text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="John"
            required={true}
            value={createUserForm.username}
            onChange={onChangeRegister}
            maxLength={40}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label
            htmlFor="password"
            className="mb-3 mt-3 text-1xl font-bold text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            value={createUserForm.password}
            onChange={onChangeRegister}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2 mb-3"
          />

          <label
            htmlFor="passwordChecker"
            className="mb-3 mt-3 text-1xl font-bold text-white"
          >
            Verify Password
          </label>
          <input
            type="password"
            name="passwordChecker"
            placeholder="Verify Password"
            required={true}
            value={passwordChecker}
            onChange={onChangeRegister}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <button
            type="submit"
            name="register"
            onClick={handleRegister}
            className="py-2 px-12 rounded-lg border-4 border-primary-color mt-5 bg-white"
          >
            Register
          </button>

          <button
            onClick={toggleForm}
            className="py-2 px-10 rounded-lg border-3 text-sm border-primary-color mt-5 bg-white shadow-lg shadow-cyan-500/50"
            name="toLogIn"
          >
            Are you already signed in?
          </button>
        </div>
      </form>
    </div>
  );

  const logInForm = (
    <div>
      <form onSubmit={handleLogIn}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mb-5 text-white text-5xl font-bold">Log In</h2>
          <label
            htmlFor="username"
            className="mb-3 mt-3 text-1xl font-bold text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="John"
            required={true}
            value={logInUserForm.username}
            onChange={onChangeLogIn}
            maxLength={40}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label
            htmlFor="password"
            className="mb-3 mt-3 text-1xl font-bold text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            value={logInUserForm.password}
            onChange={onChangeLogIn}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2 mb-3"
          />

          <button
            type="submit"
            name="register"
            onClick={handleLogIn}
            className="py-2 px-12 rounded-lg border-4 border-primary-color mt-5 bg-white"
          >
            Log In
          </button>

          <button
            onClick={toggleForm}
            className="py-2 px-10 rounded-lg border-3 text-sm border-primary-color mt-5 bg-white shadow-lg shadow-cyan-500/50"
            name="toLogIn"
          >
            Don&apos;t you have an account?
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center">
      {isRegister ? registerForm : logInForm}
    </div>
  );
}
