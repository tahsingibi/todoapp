import { useAll } from "../context/Context";

function Login() {
  const { user, setUser, setLogged } = useAll();
  const userSubmit = e => {
    e.preventDefault();
    if (user.length >= 3) {
      setLogged(user);
      localStorage.setItem("user", user);
    }
  };
  return (
    <div className="LoginPage">
      <h1>Hi, welcome!</h1>
      <form onSubmit={userSubmit}>
        <input minLength="3" placeholder="Enter your name..."
          onChange={e => setUser(e.target.value)}
          value={user}/>
        <button disabled={!(user.length >= 3)}>Login</button>
      </form>
      {!(user.length >= 3) && (
        <p className="characterAlert">Please enter at least 3 characters</p>
      )}
    </div>
  );
}

export default Login;
