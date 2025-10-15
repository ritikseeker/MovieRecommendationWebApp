import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // This effect runs whenever the 'theme' state changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark"); // Remove old class
    root.classList.add(theme); // Add the new one
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
