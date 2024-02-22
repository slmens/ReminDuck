import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  function logOut() {
    localStorage.setItem("auth", null);
    localStorage.setItem("id", null);
    localStorage.setItem("name", " ");
  }

  return (
    <nav>
      <Link to="/home">
        <button id="Logo">
          <h1>ReminDuck</h1>
        </button>
      </Link>

      <div id="nav-btn-container">
        <Link to="/create">
          <button className="nav-btn">Create</button>
        </Link>

        <Link to="/profile">
          <button className="nav-btn">Profile</button>
        </Link>

        <Link to="/">
          <button id="logout" className="nav-btn" onClick={logOut}>
            Log Out
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
