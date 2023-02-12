import ast
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = ast.literal_eval(os.environ.get("FLASK_DEBUG", "False"))

OPENAI_ORGANIZATION_ID = os.environ.get("OPENAI_ORGANIZATION_ID")

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
