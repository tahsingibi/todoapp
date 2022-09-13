function GetTodo(setTodo) {
  const todoGet = async () => {
    try {
      const todoget = await fetch(`${process.env.REACT_APP_TODOAPI}?sortBy=id&order=desc`);
      const todojson = await todoget.json();
      setTodo(todojson);
    } catch (error) {
      console.log(`GetTodo Error: ${error}`);
    }
  };

  return todoGet();
}

export default GetTodo;
