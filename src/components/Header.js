import { useAll } from "../context/Context";

function Header() {
  const { logged, setLogged } = useAll();
  const logout = () => {
    setLogged(false);
    localStorage.removeItem("user");
  };
  return (
    <header className="Header">
      <div className="HeaderLeft">
        <p>
          Welcome <b>{logged}</b>
        </p>
      </div>
      <div className="HeaderRight">
        <button className="logout" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
