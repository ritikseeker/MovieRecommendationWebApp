import { useState } from "react";

function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }
      // Dispatch a custom event
      window.dispatchEvent(new Event("themechange"));
    }
  };

  return (
    <nav className="bg-amber-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black dark:text-yellow-200 font-bold text-xl transition-colors duration-300">
          Movie Recommendation App
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
