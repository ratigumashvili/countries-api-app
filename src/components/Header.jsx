import { Link } from "react-router-dom";

import { HiMoon, HiOutlineMoon } from "react-icons/hi2";

import { useState, useEffect } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/">Where in the world?</Link>
        </h1>
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <>
              <HiMoon />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <HiOutlineMoon />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
