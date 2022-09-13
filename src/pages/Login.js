import { useAll } from '../context/Context';

function Login() {
  const { user, setUser, setLogged } = useAll();
  const userSubmit = user => {
    if (user.trim().length >= 3) {
      setLogged(user);
      localStorage.setItem('user', user);
    }
  };
  return (
    <div className="LoginPage">
      <h1>Hi, welcome!</h1>
      <div className="LoginArea">
        <input
          placeholder="Enter your name..."
          minLength="3"
          onChange={e => setUser(e.target.value)}
          value={user}
        />
        <button onClick={()=>userSubmit(user)} disabled={!(user.trim().length >= 3)}>Login</button>
      </div>
      {!(user.trim().length >= 3) && <p className="characterAlert">Please enter at least 3 characters</p>}
    </div>
  );
}

export default Login;
