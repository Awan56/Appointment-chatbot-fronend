# filename: main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React app to access FastAPI (handle CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server address
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/user/{user}")
async def get_messages(user:str):
    return [f'Welcome {user}']
