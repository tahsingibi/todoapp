import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="TodoApp">
      <Header />
      <TodoForm />
      <TodoList />
      <Footer />
    </div>
  );
}

export default Home;
