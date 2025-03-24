from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os
import re
import traceback

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="EmpowHer Legal Chatbot")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

def is_women_legal_related(query: str) -> bool:
    """
    Check if the query is related to women's legal issues
    """
    keywords = [
        # Core identifiers
        'women', 'woman', 'female', 'girl', 'gender',
        
        # Key legal areas
        'rights', 'legal', 'law', 'court', 'lawyer',
        'discrimination', 'harassment', 'violence', 'abuse',
        'divorce', 'custody', 'marriage', 'property',
        'health', 'medical', 'education', 'work',
        'immigration', 'citizenship'
    ]
    
    query = query.lower()
    return any(keyword in query for keyword in keywords)

@app.post("/chat")
async def chat(message: str = Body(..., embed=True)):
    try:
        # Check if the query is women's legal related
        if not is_women_legal_related(message):
            return {
                "status": "error",
                "message": "This chatbot only handles women-related legal questions. Please rephrase your question."
            }

        # Prepare the prompt with context
        prompt = f"""
        You are a legal assistant specializing in Indian women's rights and legal issues. 
        Please provide accurate, helpful, and empathetic legal information based on Indian laws, acts, and cases.
        Focus specifically on:
        - Indian Constitution and Fundamental Rights
        - Indian Penal Code (IPC) sections
        - Indian Evidence Act
        - Family Laws (Hindu Marriage Act, Muslim Personal Law, etc.)
        - Protection of Women from Domestic Violence Act, 2005
        - Sexual Harassment of Women at Workplace Act, 2013
        - Maternity Benefit Act, 1961
        - Equal Remuneration Act, 1976
        - Other relevant Indian laws and acts

        If the question requires immediate legal action or is about a serious legal matter, 
        please recommend consulting with an Indian lawyer.

        Question: {message}

        Please provide a clear, concise response focusing on:
        1. Relevant Indian laws and acts
        2. Important Indian court cases (if applicable)
        3. Available options under Indian legal system
        4. When to seek professional legal help from an Indian lawyer
        """

        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        return {
            "response": response.text,
            "status": "success"
        }

    except Exception as e:
        print(f"Error details: {str(e)}")
        print(f"Error type: {type(e)}")
        print(f"Full traceback: {traceback.format_exc()}")
        return {
            "status": "error",
            "message": f"An error occurred: {str(e)}"
        }

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 