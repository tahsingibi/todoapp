function GetTodo(setTodo) {
  const todoGet = async () => {
    try {
      const todoget = await fetch(process.env.REACT_APP_TODOAPI);
      const todojson = await todoget.json();
      setTodo(todojson);
    } catch (error) {
      console.log(error);
    }
  };

  return todoGet();
}

export default GetTodo;
