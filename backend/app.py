from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from utils.save_to_db import save_recommendations_to_db
load_dotenv()
from flask import Flask, redirect, request, render_template
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

@app.route('/', methods=['GET'])
def home():
    return "Home Page"

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
        
if __name__ == "__main__":
    with app.app_context():
        db.create_all()