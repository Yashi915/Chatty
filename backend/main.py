from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import re
from transformers import pipeline

app = FastAPI()

# Mount the static files (HTML, JS, CSS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load the FAQ data
faq_json_path = 'faq.json'
with open(faq_json_path, 'r') as file:
    faqs = json.load(file)

# Load the QA model
qa_model = pipeline('question-answering', model='distilbert-base-cased-distilled-squad')

# Templates for serving the HTML file
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_root(request: HTMLResponse):
    return templates.TemplateResponse("index.html", {"request": request})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        data = await websocket.receive_text()
        user_question = re.sub(r'<[^>]*>', '', data)  # Remove HTML tags if any

        if user_question.lower() == 'exit':
            await websocket.close()
            break

        result = qa_model(question=user_question, context=faqs[0]['answer'])

        response_data = {
            "answer": result['answer'],
            "score": result['score']
        }

        await websocket.send_json(response_data)
