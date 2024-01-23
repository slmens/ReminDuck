/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Auth() {
  const [createUserForm, setCreateUserForm] = useState({
    username: "",
    password: "",
    mail: "",
  });

  const passwordChecker = "";

  const [logInUserForm, setLogInUserForm] = useState({
    username: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(true);

  const handleRegister = () => {
    if (passwordChecker === createUserForm.password) {
      // api call
    }
  };

  const handleLogIn = () => {};

  const onChange = (e) => {
    const { name, type, value } = e.target;

    setCreateUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerForm = (
    <div>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="mail" className="mb-3 text-1xl font-bold"></label>
          <input
            type="email"
            name="mail"
            placeholder="example@gmail.com"
            required={true}
            value={createUserForm.mail}
            onChange={onChange}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label htmlFor="username" className="mb-3 text-1xl font-bold"></label>
          <input
            type="text"
            name="username"
            placeholder="John"
            required={true}
            value={createUserForm.username}
            onChange={onChange}
            maxLength={40}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label htmlFor="password" className="mb-3 text-1xl font-bold"></label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required={true}
            value={createUserForm.password}
            onChange={onChange}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <label htmlFor="passwordChecker"></label>
          <input
            type="password"
            name="passwordChecker"
            placeholder="password"
            required={true}
            value={passwordChecker}
            onChange={onChange}
            maxLength={50}
            className="w-60 h-14 rounded border-2 border-primary-color p-2"
          />

          <button
            type="submit"
            name="register"
            onClick={handleRegister}
            className="py-2 px-12 rounded-lg border-4 border-primary-color mt-5"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );

  const logInForm = <div></div>;

  return (
    <div className="w-screen h-screen bg-black">
      {isRegister ? registerForm : logInForm}
    </div>
  );
}
