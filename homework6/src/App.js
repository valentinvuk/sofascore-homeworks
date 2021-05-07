import React, { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { Header } from "./components/Header";
import ToDoList from "./components/TodoList";
import ToDoContext from "./context/ToDoContext";
import { LocalStorage } from "./components/LocalStorage";

function App() {
  const [todos, setTodos] = useState(
    //pitati za lakši način
    localStorage.getItem("todos") === "undefined" ||
      localStorage.getItem("todos") === "null" ||
      localStorage.length === 0 ||
      localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"))
  );

  return (
    <ToDoContext.Provider value={{ todos: todos, setTodos }}>
      <div className="app">
        <LocalStorage name="todos" />
        <Header />
        <AddTodo />
        <ToDoList />
      </div>
    </ToDoContext.Provider>
  );
}

export default App;
