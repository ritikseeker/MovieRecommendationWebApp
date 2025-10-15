import { useState } from "react";

function HomePage() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      console.log("Data in response: ", data);
      setRecommendations(data.recommendations || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-lg font-medium text-gray-700">
            Enter a genre or describe your preference:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g., "action movies with a strong female lead"'
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
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
          <div className="mt-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}
        <ul className="mt-8 space-y-3">
          {recommendations.map((movie, idx) => (
            <li
              key={idx}
              className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-gray-800 shadow-sm"
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
