import { useEffect } from "react";
import { useAll } from "./context/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";


const darkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
const lightIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>



function App() {
  const { logged, theme, setTheme } = useAll();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  const themeChanger = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="container">{logged ? <Home /> : <Login />}</div>
      <div className="copyright">
        created <a href="https://app.patika.dev/tahsingibi">tahsin sungur</a>
      </div>
      <div className="modeChanger">
        <button onClick={themeChanger}>
          {theme === "light" ? darkIcon : lightIcon}
        </button>
      </div>
    </>
  );
}

export default App;
