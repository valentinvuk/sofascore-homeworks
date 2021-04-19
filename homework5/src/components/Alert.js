import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";

function Alert({ message, alert, setAlert }) {
  const { logged } = useContext(UserContext);

  useEffect(() => {
    const time = setTimeout(() => setAlert(false), 3000);

    return () => clearTimeout(time);
  }, [setAlert, alert]);

  return (
    <div className={`${logged ? " green-alert " : ""} alert`}>
      <p>{message}</p>
    </div>
  );
}

export default React.memo(Alert);
