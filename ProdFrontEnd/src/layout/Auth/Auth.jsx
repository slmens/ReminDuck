import "./Auth.css";
import LogInForm from "./LogInForm/LogInForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { UserContext, useContext } from "../../context/UserContext";

function Auth() {
  const { isRegister } = useContext(UserContext);

  return (
    <div id="auth-container">
      {isRegister ? <LogInForm /> : <RegisterForm />}
    </div>
  );
}

export default Auth;
