import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import UserContext from "./components/UserContext";

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <UserContext.Provider value={{ logged: logged, setLogged }}>
      <div className="App">
        <Header />
        <Login />
      </div>
    </UserContext.Provider>
  );
}

export default App;
