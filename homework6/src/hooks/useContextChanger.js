import React, { useContext } from "react";
import ToDoContext from "../context/ToDoContext";

function useContextChanger(id) {
  const { todos, setTodos } = useContext(ToDoContext);

  const changeContext = React.useCallback(() => {
    todos.map((todo) =>
      todo.id === id ? (todo.finished = !todo.finished) : todo
    );
    setTodos([...todos]);
    /*     console.log(todos); */
  }, [todos, id, setTodos]);

  const removeFromContext = React.useCallback(() => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }, [todos, setTodos, id]);

  return [changeContext, removeFromContext];
}

export default useContextChanger;
