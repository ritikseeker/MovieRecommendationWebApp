import { useState } from "react";
import bgLight from "../assets/bg-light1.jpg";
import bgDark from "../assets/bg-dark.jpg";

type HomePageProps = {
  theme: string;
};

function HomePage({ theme }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bgImg = theme === "dark" ? bgDark : bgLight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations([]);
    try {
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center px-4  transition-colors duration-300"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "400px 400px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="bg-amber-50 dark:bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-xl transition-colors duration-300">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-lg font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
            Enter a genre or describe your preference:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g., "Time Travel Movies"'
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100 transition"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Get Recommendations"
            )}
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-600 dark:text-red-400 text-center font-medium">
            Some Error Occured, Please try again.
          </div>
        )}
        <ul className="mt-8 space-y-3">
          {recommendations.map((movie, idx) => (
            <li
              key={idx}
              className="bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 shadow-sm transition-colors duration-300"
            >
              {movie}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
