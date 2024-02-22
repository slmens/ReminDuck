import axios from "axios";
//import { useHistory } from "react-router-dom";

export default function SendRequest(
  actionType,
  event,
  createUserForm,
  setCreateUserForm,
  setIsRegister,
  isRegister,
  logInUserForm,
  setUserId,
  setIsLoggedIn,
  setJwt,
  history
) {
  if (actionType === "signUp") {
    console.log("fonksiyon çalıştı");
    console.log;
    console.log(createUserForm);
    axios
      .post("http://localhost:8080/user/signUp", createUserForm, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
    console.log(logInUserForm);
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
        return false;
      });
  }
}
