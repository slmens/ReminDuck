import "./Auth.css";
import LogInForm from "./LogInForm/LogInForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { UserContext, useContext } from "../../context/UserContext";

function Auth() {
  const { isRegister } = useContext(UserContext);

  return (
    <div id="auth-container">
      {isRegister ? <LogInForm /> : <RegisterForm />}
      <h1>This application is made for educational purposes. Do not use your real data!</h1>
    </div>
  );
}

export default Auth;
