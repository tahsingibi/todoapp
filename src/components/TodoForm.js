import { useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import GetTodo from './GetTodo';
import { svgCancel } from './Icons';
import { useAll } from '../context/Context';

function TodoForm() {
  const { input, setInput, todo, setTodo, editTodo, setEditTodo, setLoading } =useAll();

  const updateTodo = useCallback((content, id, isCompleted) => {
    const newTodo = todo.map(item => item?.id === id ? { id, content, isCompleted } : item);

    setLoading(true);
    setTodo(newTodo);
    setEditTodo('');

    fetch(`${process.env.REACT_APP_TODOAPI}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content }),
    })
      .then(() => {
        GetTodo(setTodo);
        setLoading(false);
      })
      .catch(e => console.log(`updateTodo Error: ${e}`));
  }, [setEditTodo, setLoading, setTodo, todo]);
  

  useEffect(() => setInput(editTodo ? editTodo.content : ''),
  [editTodo, setInput]);

  const editCancel = () => {
    setEditTodo('');
    setInput('');
  };

  const todoSubmit = useMemo(
    ()=> debounce(input => {
      if (editTodo) {
        if (input.length >= 3) updateTodo(input, editTodo.id, editTodo.isCompleted);
        return;
      }

      if (input.trim().length >= 3) {
        setInput('');
        setLoading(true);
        fetch(process.env.REACT_APP_TODOAPI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: input }),
        })
          .then(() => {
            GetTodo(setTodo);
            setLoading(false);
          })
          .catch(error => console.log(`formOnSubmit Error: ${error}`));
      }
    }, 1000),
    [setInput, setLoading, setTodo, updateTodo, editTodo]
  );

  return (
    <div className="TodoForm">
      <input
        placeholder="Enter TODO..."
        onChange={e => setInput(e.target.value)}
        value={input}
        minLength="3"
      />

      <div className="buttonGroup">
        <button
          onClick={() => todoSubmit(input)}
          disabled={!(input.trim().length >= 3)}
          className="submit"
        >
          {editTodo ? 'Update' : 'Add'}
        </button>

        {editTodo && (
          <button className="cancel" onClick={() => editCancel()}>
            {svgCancel}
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoForm;
