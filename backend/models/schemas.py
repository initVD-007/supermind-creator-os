from pydantic import BaseModel
from typing import List

# The 'Contract' for requesting ideas
class IdeaRequest(BaseModel):
    topic: str
    target_audience: str

# The 'Contract' for the Idea Generator's response
class IdeaResponse(BaseModel):
    ideas: List[str]
    suggested_tags: List[str]

# The 'Contract' for requesting a script
class ScriptRequest(BaseModel):
    title: str
    tone: str = "energetic"

# The 'Contract' for the Script Writer's response
class ScriptResponse(BaseModel):
    hook: str
    body: str
    cta: str