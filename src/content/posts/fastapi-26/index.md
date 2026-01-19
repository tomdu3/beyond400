---
title: Day 26 of 30 Days of FastAPI - Docker Compose & PostgreSQL — The Production Stack
published: 2026-01-19
description: 'Learn how to orchestrate a production-ready FastAPI stack by integrating PostgreSQL and Docker Compose for multi-container management.'
image: './docker_compose.webp'
tags: [fastapi, python, 30days]
category: 'coding'
draft: false 
lang: ''
---

On **Day 26**, we move from a single container to a **multi-container orchestration**.

After a short weekend break... it's time to graduate from SQLite to a production-grade database like **PostgreSQL**. To do this, we use **Docker Compose**, which allows us to manage our API and our database as a single unit.

So, we are making our data layer "Production-Ready." While SQLite is great for local testing, **PostgreSQL** is the industry standard for FastAPI applications.

### 1. What is Docker Compose?

Think of Docker as a single shipping container. Docker Compose is the entire cargo ship. It coordinates how the containers (API, Database, Redis, etc.) work together.

### 2. The `docker-compose.yml` File

This file defines our services. Notice how we use environment variables to connect them securely.

```yaml
services:
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=fastapi_db

  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/fastapi_db
    depends_on:
      - db
    env_file:
      - .env

volumes:
  postgres_data:

```

### 3. Updating the Code for PostgreSQL

Since we are using **PostgreSQL**, we need to install the driver. With **uv**, we add `psycopg2-binary`:

```bash
uv add psycopg2-binary

```

In your `database.py`, you simply update the `SQLALCHEMY_DATABASE_URL` to pull from your environment variables:

```python
from .config import settings

# ...

connect_args = {}
if "sqlite" in settings.database_url:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.database_url, connect_args=connect_args
)
```

### 4. Persistence with Volumes

The `volumes` section in the YAML file is critical. It maps a folder on your physical computer to the folder inside the database container. This ensures that if you delete the container, your data stays safe on your hard drive.

### 🛠️ Implementation Checklist

* [x] Installed `psycopg2-binary` using **uv**.
* [x] Created the `docker-compose.yml` file.
* [x] Updated `DATABASE_URL` to point to the `db` service.
* [x] Ran `docker-compose up --build` to launch the stack.
* [x] Verified in the logs that the API successfully connected to Postgres.

---

## 📚 Resources

1. **Official Docs:** [Docker Compose Overview](https://docs.docker.com/compose/)
2. **FastAPI Guide:** [SQL (Relational) Databases with PostgreSQL](https://fastapi.tiangolo.com/tutorial/sql-databases/)
3. **Book:** *FastAPI: Modern Python Web Development* (Chapter 11: Production Databases).