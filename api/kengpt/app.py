import os
from http import HTTPStatus

from flask import Flask, Response, make_response, request, send_from_directory
from loguru import logger

from .client import Completion
from .config import BASE_DIR, DEBUG

app = Flask(__name__, static_url_path="", static_folder=BASE_DIR / "web")


@app.route("/api")
async def health():
    return Response(b"ok", content_type="text/plain")


@app.route("/api/chat", methods=["POST"])
async def chat():
    prompt = request.json.get("prompt")
    if not prompt:
        return make_response({"error": "Empty prompt"}, HTTPStatus.BAD_REQUEST)
    try:
        completion = Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=1000,
            presence_penalty=0.6,
            temperature=0.7,
            stream=False,
        )
    except Exception as e:
        logger.error(str(e))
        return make_response({"error": str(e)}, HTTPStatus.FAILED_DEPENDENCY)
    text = completion.get("choices")[0].get("text")
    return make_response(dict(text=text))


if not DEBUG:

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def index(path: str):
        if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(404)
    def not_found(_):
        return send_from_directory(app.static_folder, "index.html")
