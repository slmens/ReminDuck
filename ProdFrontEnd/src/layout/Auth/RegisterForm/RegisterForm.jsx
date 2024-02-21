/* eslint-disable no-unused-vars */
import { UserContext, useContext } from "../../../context/UserContext";
import SendRequest from "../../../util/SendRequest.js";

function RegisterForm() {
  const {
    createUserForm,
    passwordChecker,
    toggleForm,
    setPasswordChecker,
    setCreateUserForm,
  } = useContext(UserContext);

  const handleRegister = (e) => {
    if (passwordChecker === createUserForm.password) {
      console.log(createUserForm);
      SendRequest("signUp", e);
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
}

export default RegisterForm;
