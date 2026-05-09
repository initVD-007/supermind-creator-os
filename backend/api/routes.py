from fastapi import APIRouter, HTTPException
from models.schemas import IdeaRequest, IdeaResponse, ScriptRequest, ScriptResponse
from services.gemini_service import GeminiService

router = APIRouter()
# Instantiate our AI Service
ai_worker = GeminiService()

@router.post("/generate-ideas", response_model=IdeaResponse)
async def handle_ideas(request: IdeaRequest):
    try:
        # Pass the frontend data to the AI Chef
        ideas = await ai_worker.generate_ideas(request.topic, request.target_audience)
        return {"ideas": ideas, "suggested_tags": ["AI", "Innovation"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-script", response_model=ScriptResponse)
async def handle_script(request: ScriptRequest):
    try:
        return await ai_worker.generate_script(request.title, request.tone)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))