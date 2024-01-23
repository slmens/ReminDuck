/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Auth from "./components/Auth/Auth";

function App() {
  const [currentDay, setCurrentDay] = useState();

  const [callReminders, setCallReminders] = useState([]);
  const filteredReminders = useRef([]);
  const [update, setUpdate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This method fetches the all of the reminders
  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/callReminder")
      .then((response) => {
        setCallReminders(response.data);
      })
      .then(() => {
        setUpdate(true);
      })
      .catch((error) => console.log({ error }))
      .finally();
  };

  // This method searchs all the reminders pulled from the backend and adds the ones that have reminders for today to the filteredReminders variable.
  const compareDays = async () => {
    if (!currentDay) {
      return [];
    }

    filteredReminders.current = callReminders.filter((card) =>
      card.callReminderDays.includes(currentDay)
    );
  };

  // Setting the todays name
  const setToday = async () => {
    const today = new Date();
    const options = { weekday: "long" };
    setCurrentDay(today.toLocaleDateString("en-US", options).toUpperCase());
  };

  useEffect(() => {
    const fetchDataAndSetToday = async () => {
      await fetchData();
      await setToday();
      await compareDays();
    };

    fetchDataAndSetToday();
    console.log("a");
  }, [update]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/home"
            exact
            render={() =>
              isLoggedIn ? (
                <Home data={filteredReminders.current} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/create"
            exact
            render={() =>
              isLoggedIn ? (
                <CreateReminderPage setUpdate={setUpdate} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/profile"
            exact
            render={() =>
              isLoggedIn ? (
                <Profile data={callReminders} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/create/:id"
            exact
            render={() =>
              isLoggedIn ? (
                <CreateReminderPage
                  data={callReminders}
                  setUpdate={setUpdate}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
