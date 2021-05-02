import Form from "./Form";
import useShow from "../hooks/useShow";

function AddTodo() {
  const [show, setShow] = useShow(false);
  return (
    <div className="addform">
      {show ? (
        <Form setShow={setShow} />
      ) : (
        <button onClick={setShow} className="add-button">
          + ADD TODO
        </button>
      )}
    </div>
  );
}

export default AddTodo;
