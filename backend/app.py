from flask import Flask, request, jsonify, redirect, render_template, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from utils.save_to_db import save_recommendations_to_db
load_dotenv()
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recommendations.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Recommendation(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_input = db.Column(db.String(200), unique=True, nullable=False)
    recommended_movies = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.String(200), unique=True, nullable=False)


CORS(app)

GOOGLE_API_KEY = os.getenv("API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)


@app.route('/api/recommend', methods=['POST'])
def recommend_movies():
    data = request.json
    user_query = data.get("query", "")
    print("Received query: ", user_query)
    if not user_query:
        return jsonify({"error": "No query provided."}), 400

    try:
        prompt = (
            f"Suggest 5 movie titles based on the following preference: \"{user_query}\". "
            "Return only a numbered list of movie titles."
        )
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        response = model.generate_content(prompt)
        text = response.text.strip()
        # Split into lines and remove numbering
        recommendations = [line.lstrip("12345. ").strip() for line in text.split('\n') if line.strip()]
        save_recommendations_to_db(user_query, recommendations)
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        print("Error in /api/recommend:", e)
        return jsonify({"error": str(e)}), 500

# Serve static files from the frontend's dist folder
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(os.pardir, 'frontend', 'dist', 'static'), filename)

# Serve the frontend's index.html for all other routes (for SPA support)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    dist_dir = os.path.join(os.pardir, 'frontend', 'dist')
    file_path = os.path.join(dist_dir, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(dist_dir, path)
    else:
        return send_from_directory(dist_dir, 'index.html')


if __name__ == "__main__":
    with app.app_context():
        db.create_all()