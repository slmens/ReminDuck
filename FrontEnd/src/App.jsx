/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

function App() {
  const [currentDay, setCurrentDay] = useState();

  const [callReminders, setCallReminders] = useState([]);
  const filteredReminders = useRef([]);
  const [update, setUpdate] = useState(false);

  // This method fetches the all of the reminders
  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/callReminder")
      .then((response) => {
        setCallReminders(response.data);
        setUpdate(true);
      })
      .catch((error) => console.log({ error }));
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
  }, [update]);

  const updateCallReminders = async () => {
    await fetchData();
    await setToday();
    await compareDays();
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home data={filteredReminders.current} />}
          />
          <Route
            path="/create"
            exact
            render={() => <CreateReminderPage setUpdate={() => setUpdate} />}
          />
          <Route
            path="/profile"
            exact
            render={() => <Profile data={callReminders} />}
          />
          <Route
            path="/create/:id"
            exact
            render={() => <CreateReminderPage data={callReminders} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
