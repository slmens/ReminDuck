/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import CreateReminderPage from "./components/Pages/CreateReminderPage";
import Profile from "./components/Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={CreateReminderPage} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
