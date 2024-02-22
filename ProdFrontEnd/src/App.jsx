/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { DataContext } from "./context/DataContext";
import { useLocalState } from "./util/UseLocalStorage";
import "./App.css";
import Auth from "./layout/Auth/Auth";
import Home from "./layout/Home/Home";
import CreateReminderPage from "./layout/CreateReminderPage/CreateReminderPage";
import Profile from "./layout/Profile/Profile";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useLocalState("", "id");
  const [jwt, setJwt] = useLocalState("", "au");
  const [isRegister, setIsRegister] = useState(true);
  const [passwordChecker, setPasswordChecker] = useState("");

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

  // FORM FUNCTIONS START --------------------------------------------------------

  function toggleForm() {
    setIsRegister(!isRegister);
  }

  // FORM FUNCTIONS END --------------------------------------------------------

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
  };

  const dataContext = {};

  useEffect(() => {
    console.log(jwt);
  }, [jwt]);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={userContext}>
        <DataContext.Provider value={dataContext}>
          <QueryClientProvider client={queryClient}>
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
                    jwt !== "" && jwt !== null ? (
                      <Profile />
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
                      <CreateReminderPage />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
              </Switch>
            </BrowserRouter>
          </QueryClientProvider>
        </DataContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
