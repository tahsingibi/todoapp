import { useAll } from '../context/Context';

function Footer() {
  const { filtered, setFiltered } = useAll();
  return (
    <footer className="Footer">
      <button
        className={!filtered ? 'selected' : ''}
        onClick={() => setFiltered('')}>
        All
      </button>
      <button
        className={filtered === 1 ? 'selected' : ''}
        onClick={() => setFiltered(1)}>
        Active
      </button>
      <button
        className={filtered === 2 ? 'selected' : ''}
        onClick={() => setFiltered(2)}>
        Done
      </button>
    </footer>
  );
}

export default Footer;
