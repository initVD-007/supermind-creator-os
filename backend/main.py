from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="Supermind Creator OS")

# Enable CORS so our Next.js Frontend can talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect our modular routes
app.include_router(router)

@app.get("/")
def root():
    return {"status": "Supermind OS Online"}