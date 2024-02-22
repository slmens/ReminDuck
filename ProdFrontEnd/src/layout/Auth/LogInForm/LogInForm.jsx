/* eslint-disable no-unused-vars */

import { UserContext, useContext } from "../../../context/UserContext";
import SendRequest from "../../../util/SendRequest";
import { useHistory } from "react-router-dom";
import "../LogInForm/LogInForm.css";

function LogInForm() {
  const {
    logInUserForm,
    toggleForm,
    setLogInUserForm,
    createUserForm,
    setCreateUserForm,
    setIsRegister,
    isRegister,
    setUserId,
    setIsLoggedIn,
    setJwt,
  } = useContext(UserContext);

  const history = useHistory();

  const handleLogIn = async (e) => {
    e.preventDefault();
    // api call
    if (logInUserForm.username === "" || logInUserForm.password === "") {
      alert("Please fill in all fields");
    } else {
      await SendRequest(
        "signIn",
        e,
        createUserForm,
        setCreateUserForm,
        setIsRegister,
        isRegister,
        logInUserForm,
        setUserId,
        setIsLoggedIn,
        setJwt,
        history
      );
    }
  };

  const onChangeLogIn = (e) => {
    const { name, type, value } = e.target;

    setLogInUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div id="login-form-container">
      <form onSubmit={handleLogIn}>
        <div id="login-form-inner-container">
          <h2 id="auth-header">Log In</h2>
          <label htmlFor="username" className="auth-label">
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
            className="auth-login-input"
          />

          <label htmlFor="password" className="auth-label">
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
            className="auth-login-input"
          />

          <button
            type="submit"
            name="register"
            onClick={handleLogIn}
            className="auth-login-button"
          >
            Log In
          </button>

          <button
            onClick={toggleForm}
            className="auth-login-button"
            name="toLogIn"
          >
            Don&apos;t you have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
