/* eslint-disable no-unused-vars */

import { UserContext, useContext } from "../../../context/UserContext";
import SendRequest from "../../../util/SendRequest";

function LogInForm() {
  const { logInUserForm, toggleForm, setLogInUserForm } =
    useContext(UserContext);

  const handleLogIn = (e) => {
    // api call
    SendRequest("signIn", e);
  };

  const onChangeLogIn = (e) => {
    const { name, type, value } = e.target;

    setLogInUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
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
}

export default LogInForm;
