import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAll } from '../context/Context';
import { svgLoader } from '../components/Icons';

function Home() {
  const { loading } = useAll();
  return (
    <div className="TodoApp">
      <Header />
      <div className={loading === true ? 'loading' : ''}>
        {loading && <div className="loader">{svgLoader}</div>}
        <TodoForm />
        <TodoList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
