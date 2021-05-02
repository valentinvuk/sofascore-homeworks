import React, { useContext, useState } from "react";
import ToDoContext from "../context/ToDoContext";
import Filters from "./Filters";
import ToDo from "./ToDo";

function ToDoList() {
  const [filter, setFilter] = useState(0);
  const { todos } = useContext(ToDoContext);

  const renderTodos = React.useCallback(
    () =>
      todos
        .filter(
          (todo) =>
            todo.finished !==
            (filter !== 0 ? (filter === 2 ? true : false) : !todo.finished)
        )
        .map((todo) => <ToDo key={todo.id} todo={todo} />),
    [todos, filter]
  );

  return (
    <div className="todolist">
      <Filters setFilter={setFilter} filter={filter} />
      {renderTodos()}
    </div>
  );
}

export default ToDoList;
