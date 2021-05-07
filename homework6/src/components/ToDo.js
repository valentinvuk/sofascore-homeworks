import x from "../close.svg";
import useContextChanger from "../hooks/useContextChanger";

function ToDo({ todo }) {
  const [changeContext, removeFromContext] = useContextChanger(todo.id);

  return (
    <div className="todowrapper">
      <p
        onClick={changeContext}
        className={todo.finished ? "checked content" : "content"}
      >
        {todo.content}
      </p>
      <div className="todowrapperbuttons">
        <img
          onClick={removeFromContext}
          className="mini red-x"
          src={x}
          alt="mini x"
        />
      </div>
    </div>
  );
}

export default ToDo;
