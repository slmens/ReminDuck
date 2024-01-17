/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Profile from "./components/Pages/Profile";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [currentDay, setCurrentDay] = useState();

  const [callReminders, setCallReminders] = useState([]);
  const filteredReminders = useRef([]);

  // This method fetches the all of the reminders
  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/callReminder")
      .then((response) => setCallReminders(response.data))
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
  }, [currentDay]);

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
            render={() => (
              <Home
                data={filteredReminders.current}
                updateCallReminders={updateCallReminders}
              />
            )}
          />
          <Route
            path="/create"
            exact
            render={() => (
              <CreateReminderPage updateCallReminders={updateCallReminders} />
            )}
          />
          <Route
            path="/profile"
            exact
            render={() => <Profile data={callReminders} />}
          />
          <Route
            path="/create/:id"
            exact
            render={() => (
              <CreateReminderPage
                data={callReminders}
                updateCallReminders={updateCallReminders}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
