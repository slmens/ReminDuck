/* eslint-disable no-unused-vars */
import { BrowserRouter,Route,Switch} from "react-router-dom"
import NavBar from "./components/NavBarComponents/Navbar"
import Home from "./components/Home"
import CreateReminderPage from "./components/CreateReminderPage"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/create" exact component={CreateReminderPage}/>
              <Route path="/profile" exact component={Profile}/>
          </Switch>   
      </BrowserRouter>
    </>
  )
}

export default App
