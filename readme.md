# Movies Recommendation WebApp

Uses React, Flask, Sqllite DB
Suggests movies uing AI
Has light/dark mode

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

```
   python -m venv .venv
   .venv\Scripts\activate
```

6. Install necessary libraries (present in requirements.txt)

   pip install -r requirements.txt

7. Create .env file and save the API key(create previously) in it

8. Open a new terminal

9. Go to frontend directory, by

```
    cd MovieRecommendationWebApp
    cd frontend
```

10. Install Dependencies
    npm install

11. To Run on dev server:
    npm run dev

12. Build it for production by,
    npm run build

13. To use the WebApp, make sure dist directory is created inside frontend directory when ran "npm run build". Now, run the flask server in the 1st terminal by :

```
flask run
```
