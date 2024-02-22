/* eslint-disable no-unused-vars */
import { UserContext, useContext } from "../../../context/UserContext";
import SendRequest from "../../../util/SendRequest.js";
import "../RegisterForm/RegisterForm.css";

function RegisterForm() {
  const {
    createUserForm,
    passwordChecker,
    toggleForm,
    setPasswordChecker,
    setCreateUserForm,
    logInUserForm,
    setIsRegister,
    isRegister,
    setUserId,
    setIsLoggedIn,
    setJwt,
  } = useContext(UserContext);

  const handleRegister = (e) => {
    e.preventDefault();
    if (createUserForm.username === "" || createUserForm.password === "") {
      alert("Please fill in all fields");
    } else {
      if (passwordChecker === createUserForm.password) {
        console.log(createUserForm);
        SendRequest(
          "signUp",
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
    }
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

  return (
    <div id="register-form-container">
      <form onSubmit={handleRegister}>
        <div id="register-form-inner-container">
          <h2 id="auth-header">Create Account</h2>
          <label htmlFor="mail" className="auth-label">
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
            className="auth-register-input"
          />

          <label htmlFor="username" className="auth-label">
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
            className="auth-register-input"
          />

          <label htmlFor="password" className="auth-label">
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
            className="auth-register-input"
          />

          <label htmlFor="passwordChecker" className="auth-label">
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
            className="auth-register-input"
          />

          <button
            type="submit"
            name="register"
            onClick={handleRegister}
            className="auth-register-button"
          >
            Register
          </button>

          <button
            onClick={toggleForm}
            className="auth-register-button"
            name="toLogIn"
          >
            Do you already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
