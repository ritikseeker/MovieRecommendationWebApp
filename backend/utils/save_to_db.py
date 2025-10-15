from datetime import datetime
import json

def save_recommendations_to_db(user_query, recommendations):
    from app import db, Recommendation
    recommendations_json = json.dumps(recommendations)
    timestamp = datetime.now().isoformat()

    # Check if a recommendation for this user_input already exists
    rec = Recommendation.query.filter_by(user_input=user_query).first()
    if rec:
        rec.recommended_movies = recommendations_json
        rec.timestamp = timestamp
    else:
        rec = Recommendation(
            user_input=user_query,
            recommended_movies=recommendations_json,
            timestamp=timestamp
        )
        db.session.add(rec)
    db.session.commit()