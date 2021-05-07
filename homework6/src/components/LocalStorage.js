import React from "react";
import ToDoContext from "../context/ToDoContext";

export function LocalStorage({ name }) {
  const { todos } = React.useContext(ToDoContext);

  const setItems = React.useCallback(
    () => localStorage.setItem(name, JSON.stringify(todos)),
    [name, todos]
  );

  React.useEffect(() => {
    return setItems();
  }, [setItems]);

  return <></>;
}
