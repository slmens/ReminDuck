import { BrowserRouter,Route,Routes} from "react-router-dom"
import NavBar from "./components/Navbar"
import Home from "./components/Home"
import CreateReminderPage from "./components/CreateReminderPage"
import Profile from "./components/Profile"

function App() {

  return (
    <>

      <NavBar />

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/create" element={<CreateReminderPage />}/>
              <Route path="/profile" element={<Profile />}/>
          </Routes>   
      </BrowserRouter>
    </>
  )
}

export default App
