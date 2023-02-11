FROM python:3.10-bullseye as base

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV POETRY_VERSION 1.3.2

FROM base as dev

RUN pip install "poetry==$POETRY_VERSION" && poetry config virtualenvs.create false

WORKDIR /tmp

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-interaction --no-ansi

WORKDIR /api

ENTRYPOINT [ "gunicorn", "--bind", "0.0.0.0:5000", "--config", "gunicorn.conf.py", "--reload" ]
