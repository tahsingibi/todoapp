import { useAll } from "../context/Context";
import GetTodo from "./GetTodo";

function TodoList() {
  const { todo, setTodo, setEditTodo, filtered } = useAll();
  
  const itemState = (id, isCompleted) => {
    fetch(`${process.env.REACT_APP_TODOAPI}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    })
      .then(() => GetTodo(setTodo))
      .catch(e => console.log(`error ${e}`));
  };

  const itemDelete = id => {
    fetch(`${process.env.REACT_APP_TODOAPI}/${id}`, {
      method: "DELETE",
    })
      .then(() => GetTodo(setTodo))
      .catch(e => console.log(`delete error: ${e}`));
  };

  const itemEdit = id => {
    setEditTodo(todo?.find(item => item?.id === id));
  };

  return (
    <div className="TodoList">
      <ul>
        {(!filtered
          ? todo
          : filtered === 1
          ? todo.filter(i => !i.isCompleted)
          : todo.filter(i => i.isCompleted)
        )?.map(item => (
          <li key={item?.id} className={item.isCompleted.toString()}>
            <p className="content">{item?.content}</p>
            <p className="buttons">
              <button className="state"
                onClick={() => itemState(item?.id, item?.isCompleted)}>
                {item?.isCompleted === false ? "Active" : "Done"}
              </button>
              <button className="edit"
                onClick={() => itemEdit(item?.id, item?.content)}>
                Edit
              </button>
              <button className="delete" onClick={() => itemDelete(item?.id)}>
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;