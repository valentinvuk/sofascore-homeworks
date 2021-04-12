import React, { useContext, useState } from "react";
import Alert from "./Alert";
import Authentication from "./Authentication";
import UserContext from "./UserContext";
import successPic from "../media/succes.jpg";

function Login() {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { logged } = useContext(UserContext);

  return (
    <div className={`${logged ? "green" : ""} login-container`}>
      <p className="login-header">Re.cord</p>
      {!logged ? (
        <Authentication
          setAlert={(e) => setAlert(e)}
          setMessage={(e) => setMessage(e)}
        />
      ) : (
        <img className="success-img" src={successPic} alt="success"></img>
      )}
      {alert ? (
        <Alert alert={alert} setAlert={(e) => setAlert()} message={message} />
      ) : null}
    </div>
  );
}

export default React.memo(Login);
