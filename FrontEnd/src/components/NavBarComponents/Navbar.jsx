/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();

  function logOut() {
    localStorage.setItem("auth", null);
    localStorage.setItem("id", null);
    localStorage.setItem("name", " ");
  }

  return (
    <nav className="w-full h-24 bg-black flex flex-row justify-between items-center px-24 py-12">
      <Link to="/home">
        <button className="bg-primary-color w-36 h-12 border-2 border-white rounded">
          <h1 className="text-lg font-bold">ReminDuck</h1>
        </button>
      </Link>

      <div className="flex flex-row items-center">
        <Link to="/create">
          <button className="w-16 h-16 rounded-full bg-white border-2 border-primary-color"></button>
        </Link>

        <Link to="/profile">
          <button className="w-16 h-16 rounded-full bg-white border-2 border-primary-color ml-16"></button>
        </Link>

        <Link to="/">
          <button
            className="w-32 h-16 rounded-full bg-white border-2 border-primary-color ml-16 text-lg font-bold"
            onClick={logOut}
          >
            Log Out
          </button>
        </Link>
      </div>
    </nav>
  );
}
