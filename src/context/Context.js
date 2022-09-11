import { useState, createContext, useContext, useEffect } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const initialUser = localStorage.getItem("user") || false;
  const [logged, setLogged] = useState(initialUser);
  const [user, setUser] = useState("");

  const defaultTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(defaultTheme);

  const [filtered, setFiltered] = useState("");

  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editTodo, setEditTodo] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_TODOAPI)
      .then(res => res.json())
      .then(setTodo)
      .catch(e => console.log(`Context/useEffect Error: ${e}`));
  }, []);

  const data = {
    logged,
    setLogged,
    user,
    setUser,
    todo,
    setTodo,
    input,
    setInput,
    editTodo,
    setEditTodo,
    filtered,
    setFiltered,
    theme,
    setTheme,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAll = () => useContext(Context);
export default Provider;
