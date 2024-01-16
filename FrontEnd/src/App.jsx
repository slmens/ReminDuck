/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Profile from "./components/Pages/Profile";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import UpdateReminderPage from "./components/Pages/UpdateReminderPage";

function App() {
  const [callReminders, setCallReminders] = useState([]);
  const [currentDay, setCurrentDay] = useState();
  const comparedCards = useRef([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/callReminder")
      .then((response) => setCallReminders(response.data))
      .catch((error) => console.log({ error }));
  };

  const compareDays = async () => {
    if (!currentDay) {
      return [];
    }

    return callReminders.filter((card) =>
      card.callReminderDays.includes(currentDay)
    );
  };

  const setToday = async () => {
    const today = new Date();
    const options = { weekday: "long" };
    setCurrentDay(today.toLocaleDateString("en-US", options).toUpperCase());
  };

  useEffect(() => {
    const fetchDataAndSetToday = async () => {
      await fetchData();
      await setToday();
      const filteredReminders = await compareDays();
      comparedCards.current = filteredReminders;
    };

    fetchDataAndSetToday();

    // Cleanup code when the component unmounts
    return () => {
      // Any cleanup code you want to run when the component unmounts
    };
  }, [currentDay]);

  function reRender() {
    setCurrentDay(" ");
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home data={comparedCards.current} reRender={reRender} />
            )}
          />
          <Route
            path="/create"
            exact
            render={() => <CreateReminderPage reRender={reRender} />}
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
              <CreateReminderPage data={callReminders} reRender={reRender} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
