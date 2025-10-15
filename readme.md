# How to Create a Google Generative AI API Key?

## I have used Google's and not OpenAI's api since my openAI credits are already exhausted

1.1. Go to Google AI Studio:
https://aistudio.google.com/app/apikey

1.2. Sign in with your Google Account.

1.3. Click “Create API Key”.

1.4. Copy the API Key shown on the page.

1.5. Add it to your project:
1.5.1. Create a file named .env in your project directory (if it doesn’t exist).
1.5.2. Add this line to your .env file:

```
API_KEY="your_api_key"
```

# Steps to run

1. Create your own personal api key from google ai studio (needed to access Google Generative AI (Gemini)). And save it as below:

```
API_KEY="your_api_key"
```

2. git clone https://github.com/ritikseeker/MovieRecommendationWebApp.git

3. cd MovieRecommendationWebApp

4. cd backend

5. create virtual environment (like .venv), then activate using following command (in cmd) :
   python -m venv .venv
   .venv\Scripts\activate

6. Install necessary libraries (present in requirements.txt)
   pip install -r requirements.txt

7. Create .env file and save the API key(create previously) in it

8.
9. Run the main by running:
   flask run

10. Go to frontend directory, by
    cd ..
    cd frontend

11. Use vite and react to create frontend
