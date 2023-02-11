from flask import Flask, Response, make_response, request

from .client import Completion

app = Flask(__name__)


@app.route("/api")
async def health():
    return Response(b"ok", content_type="text/plain")


@app.route("/api/chat", methods=["POST"])
async def chat():
    prompt = request.json.get("prompt")
    completion = Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=1000,
        presence_penalty=0.6,
        temperature=0.7,
        stream=False,
    )
    text = completion.get("choices")[0].get("text")
    return make_response(dict(text=text))
