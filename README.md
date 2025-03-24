# EmpowHer Legal Chatbot Backend

This is the backend service for the EmpowHer platform's AI chatbot, specifically designed to handle women-related legal questions using Google's Gemini API.

## Features

- AI-powered legal assistance using Gemini API
- Strict validation to ensure only women-related legal questions are processed
- FastAPI-based RESTful API
- Health check endpoint

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory and add your Gemini API key:

```
GOOGLE_API_KEY=your_api_key_here
```

4. Run the server:

```bash
uvicorn app.main:app --reload
```

## API Endpoints

### POST /chat

Send a message to the chatbot:

```json
{
  "message": "What are my rights regarding workplace harassment?"
}
```

### GET /health

Check the health status of the service.

## Security Note

The chatbot is designed to only respond to women-related legal questions. Any other queries will be rejected with a 400 Bad Request response.

## Error Handling

The API includes proper error handling for:

- Invalid API key
- Non-women-related legal questions
- Server errors
- Invalid request format
