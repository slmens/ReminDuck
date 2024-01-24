/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Auth from "./components/Auth/Auth";
import { useLocalState } from "./util/useLocalStorage";

function App() {
  const [currentDay, setCurrentDay] = useState();

  const [callReminders, setCallReminders] = useState([]);
  const filteredReminders = useRef([]);
  const [update, setUpdate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useLocalState("", "id");
  const [jwt, setJwt] = useLocalState("", "auth");

  // This method fetches the all of the reminders
  const fetchCallReminderDataByUserId = async () => {
    await axios
      .get(`http://localhost:8080/callReminder/byUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setCallReminders(response.data);
        console.log(response.data);
      })
      .then(() => {
        setUpdate(true);
      })
      .catch((error) => console.log({ error }))
      .finally();
  };

  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        localStorage.setItem("name", res.data.username);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  // home a girdiğimde bana user id ile hem userı hem de userın call reminderlarını çekmesi lazım

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

  const fetchDataAndSetToday = async () => {
    await fetchCallReminderDataByUserId();
    await setToday();
    await compareDays();
  };

  useEffect(() => {
    //fetchDataAndSetToday();
  }, [update, isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Auth
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
                setJwt={setJwt}
              />
            )}
          />
          <Route
            path="/home"
            exact
            render={() =>
              jwt !== "" && jwt !== null ? (
                <Home
                  data={filteredReminders.current}
                  fetchUserData={fetchUserData}
                  fetchDataAndSetToday={fetchDataAndSetToday}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/create"
            exact
            render={() =>
              jwt !== "" && jwt !== null ? (
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
              jwt !== "" && jwt !== null ? (
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
              jwt !== "" && jwt !== null ? (
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
