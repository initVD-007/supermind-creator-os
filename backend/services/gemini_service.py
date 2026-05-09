import os
import google.generativeai as genai
from dotenv import load_dotenv
import re

load_dotenv()
# Configure the AI with your secret key from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class GeminiService:
    def __init__(self):
        # We use the Gemini 3 Flash model for high speed and intelligence
        self.model = genai.GenerativeModel('gemini-3-flash-preview')

    async def generate_ideas(self, topic: str, audience: str):
        prompt = f"Generate 3 viral content ideas for {topic} for a {audience} audience. Return titles only."
        response = self.model.generate_content(prompt)
        # Split text into lines and clean up whitespace/dashes
        return [line.strip("- ").strip() for line in response.text.strip().split('\n') if line.strip()][:3]

    async def generate_script(self, title: str, tone: str):
        prompt = f"Write a 60s video script for '{title}' with a {tone} tone. Use labels HOOK:, BODY:, CTA:."
        response = self.model.generate_content(prompt)
        raw = response.text
        
        # We use 'Regex' to find text between labels. 
        # re.S (DotAll) allows capturing multiple lines. re.I ignores case.
        sections = {"hook": "No hook found", "body": "No body found", "cta": "No CTA found"}
        h = re.search(r"HOOK:(.*?)(?=BODY:|$)", raw, re.S | re.I)
        b = re.search(r"BODY:(.*?)(?=CTA:|$)", raw, re.S | re.I)
        c = re.search(r"CTA:(.*)", raw, re.S | re.I)

        if h: sections["hook"] = h.group(1).strip()
        if b: sections["body"] = b.group(1).strip()
        if c: sections["cta"] = c.group(1).strip()
        return sections