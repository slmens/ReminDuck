/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCallReminderByUserId } from "./service/CardReminderService.js";
import { UserContext } from "./context/UserContext";
import { useLocalState } from "./util/UseLocalStorage";
import "./App.css";
import Auth from "./layout/Auth/Auth";
import Home from "./layout/Home/Home";
import CreateReminderPage from "./layout/CreateReminderPage/CreateReminderPage";
import Profile from "./layout/Profile/Profile";
import { useEffect, useState, useRef } from "react";
import WebSocketService from "./util/WebSocketService";
import useCardQuery from "./queries/useCardQuery.jsx";

function App() {
  const isConnected = useRef(false);
  const isNotified = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useLocalState("", "id");
  const [jwt, setJwt] = useLocalState("", "au");
  const [isRegister, setIsRegister] = useState(true);
  const [passwordChecker, setPasswordChecker] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const [createUserForm, setCreateUserForm] = useState({
    username: "",
    password: "",
    mail: "",
  });

  const [logInUserForm, setLogInUserForm] = useState({
    username: "",
    password: "",
  });

  // STATES END --------------------------------------------------------

  // DATA FETCHING START --------------------------------------------------------

  const data = useCardQuery({ id: userId });

  // DATA FETCHING END --------------------------------------------------------

  // FORM FUNCTIONS START --------------------------------------------------------

  function toggleForm() {
    setIsRegister(!isRegister);
  }

  // FORM FUNCTIONS END --------------------------------------------------------

  // UTIL FUNCTIONS START --------------------------------------------------------

  function handleReceivedNotification(message) {
    notifyFunc(message.whoToCall);
    isNotified.current = true;
  }

  const notifyFunc = (whoToCall) => {
    toast(`You need to call ${whoToCall} right now!`);
    isNotified.current = false;
  };

  // UTIL FUNCTIONS END --------------------------------------------------------

  // AŞAĞISI CONTEXT ------------------------------------------------------------

  const userContext = {
    jwt: jwt,
    setJwt: setJwt,
    isRegister: isRegister,
    setIsRegister: setIsRegister,
    createUserForm: createUserForm,
    setCreateUserForm: setCreateUserForm,
    logInUserForm: logInUserForm,
    setUserId: setUserId,
    setIsLoggedIn: setIsLoggedIn,
    setLogInUserForm: setLogInUserForm,
    toggleForm: toggleForm,
    setPasswordChecker: setPasswordChecker,
    passwordChecker: passwordChecker,
    data: data.query.data,
    setIsUpdated: setIsUpdated,
    isUpdated: isUpdated,
    isConnected: isConnected,
  };

  useEffect(() => {
    isConnected.current = false;
    WebSocketService.initializeWebSocket(
      handleReceivedNotification,
      isConnected,
      isNotified
    );
    data.query.refetch();
    setIsUpdated(false);
  }, [isUpdated, data.query.data, isConnected]);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={userContext}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Auth />} />
            <Route
              path="/home"
              exact
              render={() =>
                jwt !== "" && jwt !== null ? <Home /> : <Redirect to="/" />
              }
            />
            <Route
              path="/create"
              exact
              render={() =>
                jwt !== "" && jwt !== null ? (
                  <CreateReminderPage />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/profile"
              exact
              render={() =>
                jwt !== "" && jwt !== null ? <Profile /> : <Redirect to="/" />
              }
            />
            <Route
              path="/create/:id"
              exact
              render={() =>
                jwt !== "" && jwt !== null ? (
                  <CreateReminderPage />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
