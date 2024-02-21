import axios from "axios";
import { UserContext, useContext } from "../context/UserContext.js";

export default function SendRequest(actionType, event) {
  const {
    createUserForm,
    setCreateUserForm,
    setIsRegister,
    isRegister,
    logInUserForm,
    setUserId,
    setIsLoggedIn,
    setJwt,
  } = useContext(UserContext);

  event.preventDefault();
  if (actionType === "signUp") {
    axios
      .post("http://localhost:8080/user/signUp", createUserForm)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        setCreateUserForm({
          username: "",
          password: "",
          mail: "",
        });
        setIsRegister(!isRegister);
      })
      .catch((e) => {
        console.warn(e);
      });
  } else if (actionType === "signIn") {
    axios
      .post("http://localhost:8080/user/signIn", logInUserForm)
      .then((res) => {
        if (res.data.id !== "") {
          console.log(res.data);
          setIsLoggedIn(true);
          setUserId(res.data.id);
          setJwt(res.data.jwt);
          history.push("/home");
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }
}
