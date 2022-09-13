import { useEffect } from "react";
import { useAll } from "./context/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {svgDark, svgLight} from "./components/Icons"


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
        created by <a href="https://app.patika.dev/tahsingibi">tahsin sungur</a>
      </div>
      <div className="modeChanger">
        <button onClick={themeChanger}>
          {theme === "light" ? svgDark : svgLight}
        </button>
      </div>
    </>
  );
}

export default App;
