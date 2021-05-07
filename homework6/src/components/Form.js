import React, { useState, useRef, useContext } from "react";
import ToDoContext from "../context/ToDoContext";
import tick from "../checked.svg";
import x from "../close.svg";

function Form({ setShow }) {
  const { todos, setTodos } = useContext(ToDoContext);
  const inputRef = useRef(null);
  const [tickColor, setTickColor] = useState(false);

  const checkInput = React.useCallback(() => {
    if (inputRef.current.value.length > 0) setTickColor(true);
    else setTickColor(false);
  }, [inputRef, setTickColor]);

  const submit = React.useCallback(
    (event) => {
      event.preventDefault();
      if (inputRef.current.value.length > 0) {
        setTodos([
          ...todos,
          {
            content: inputRef.current.value,
            finished: false,
            id: Math.random() * 214521,
          },
        ]);
        inputRef.current.value = "";
      }
    },
    [todos, inputRef, setTodos]
  );

  const reset = React.useCallback(() => {
    inputRef.current.value = "";
    setShow();
  }, [inputRef, setShow]);

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        onChange={checkInput}
        ref={inputRef}
        className="todo-input"
        type="text"
        size="50"
        maxLength="40"
        autoFocus
        placeholder="Enter Task"
      ></input>
      <>
        <img
          onClick={submit}
          src={tick}
          alt="tick"
          className={`${tickColor ? "green-tick" : ""} img-button`}
        />
        <img onClick={reset} src={x} alt="x" className="red-x img-button" />
      </>
    </form>
  );
}

export default React.memo(Form);
