import React, { useContext, useRef, useState } from "react";
import UserContext from "./UserContext";

function Authentication({ setAlert, setMessage }) {
  //refs
  const passRef = useRef(null);
  const userRef = useRef(null);
  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLogged } = useContext(UserContext);
  //callback
  const tryLogin = React.useCallback(
    async (user, pass) => {
      try {
        await fetch("https://private-leagues-api.herokuapp.com/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user, password: pass }),
        }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            setLogged(true);
            setMessage("Successful login!");
            setAlert(true);
          } else {
            setMessage("Invalid username or password!");
            setAlert(true);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    [setAlert, setMessage, setLogged]
  );

  const login = React.useCallback(
    (event) => {
      event.preventDefault();
      if (!username || !password) {
        setMessage("Username and password required!");
        setAlert(true);
        return null;
      }
      setAlert(false);
      tryLogin(username, password);
    },
    [username, password, setAlert, setMessage, tryLogin]
  );

  return (
    <form className="form">
      <label htmlFor="username">Username:</label>
      <input
        onChange={() => setUsername(userRef.current.value)}
        ref={userRef}
        type="text"
        name="username"
        className="input"
        placeholder="Username"
        size="20"
        required
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        onChange={() => setPassword(passRef.current.value)}
        ref={passRef}
        type="password"
        name="password"
        className="input"
        placeholder="Password"
        size="20"
        required
      ></input>
      <button onClick={login} type="submit" className="form-submit">
        Log in
      </button>
    </form>
  );
}

export default React.memo(Authentication);
