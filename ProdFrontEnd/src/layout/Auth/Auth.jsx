import "./Auth.css";
import LogInForm from "./LogInForm/LogInForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { UserContext, useContext } from "../../context/UserContext";

function Auth() {
  const { isRegister } = useContext(UserContext);

  return (
    <div id="auth-container">
      {isRegister ? <LogInForm /> : <RegisterForm />}
      <h1>
        This project is for educational purposes only. Do not use your personal
        data
      </h1>
    </div>
  );
}

export default Auth;
