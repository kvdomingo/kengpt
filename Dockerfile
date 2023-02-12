FROM python:3.10-bullseye as base

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base as requirements-builder

ENV POETRY_VERSION 1.3.2

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /tmp

COPY ./api/poetry.lock ./api/pyproject.toml ./

RUN poetry export --without-hashes -f requirements.txt > requirements.txt

FROM node:16-alpine as web-build

WORKDIR /app

COPY ./ui/ ./

RUN yarn install && yarn build

FROM base as prod

WORKDIR /tmp

COPY --from=requirements-builder /tmp/requirements.txt .

RUN pip install -r requirements.txt

WORKDIR /api

COPY ./api/ ./
COPY --from=web-build /app/dist ./web/

ENTRYPOINT [ "/bin/sh", "-c", "exec gunicorn --bind 0.0.0.0:$PORT --config gunicorn.conf.py" ]
