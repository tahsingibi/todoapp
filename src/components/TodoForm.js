import { useEffect } from "react";
import { useAll } from "../context/Context";
import GetTodo from "./GetTodo";

const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 24 24"strokeWidth={1.5}stroke="currentColor"className="w-6 h-6"><path strokeLinecap="round"strokeLinejoin="round"d="M6 18L18 6M6 6l12 12"/></svg>

function TodoForm() {
  const { input, setInput, todo, setTodo, editTodo, setEditTodo } = useAll();
  const formOnSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      if (input.length >= 3) {
        fetch(process.env.REACT_APP_TODOAPI, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: input }),
        })
          .then(() => {
            GetTodo(setTodo);
            setInput("");
          })
          .catch(e => console.log(`formOnSubmit Error: ${e}`));
      }
    } else {
      if (input.length >= 3) {
        updateTodo(input, editTodo.id, editTodo.isCompleted);
      }
    }
  };

  function updateTodo(content, id, isCompleted) {
    const newTodo = todo.map(item =>
      item?.id === id ? { id, content, isCompleted } : item
    );
    setTodo(newTodo);
    setEditTodo("");
    fetch(`${process.env.REACT_APP_TODOAPI}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    })
      .then(() => GetTodo(setTodo))
      .catch(e => console.log(`updateTodo Error: ${e}`));
  }
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.content);
    } else {
      setInput("");
    }
  }, [editTodo, setInput]);

  const editCancel = () => {
    setEditTodo("");
    setInput("");
  };

  return (
    <div>
      <form onSubmit={formOnSubmit} className="TodoForm">
        <input minLength="3" placeholder="Enter TODO..."
          onChange={e => setInput(e.target.value)}
          value={input}/>
        <div className="formButton">
          <button className="submit" disabled={!(input.length >= 3)}>
            {editTodo ? "Update" : "Add"}
          </button>
          {editTodo && (
            <button className="cancel" onClick={() => editCancel()}>
              {cancelIcon}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
