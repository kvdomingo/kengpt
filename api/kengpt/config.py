import ast
import os

from dotenv import load_dotenv

load_dotenv()


DEBUG = ast.literal_eval(os.environ.get("FLASK_DEBUG", "False"))

OPENAI_ORGANIZATION_ID = os.environ.get("OPENAI_ORGANIZATION_ID")

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
