---
title: Day 25 of 30 Days of FastAPI - Dockerizing FastAPI — The uv Way
published: 2026-01-17
description: 'Learn how to deploy a FastAPI application using Docker, ensuring it runs consistently across different environments.'
image: './docker.webp'
tags: [fastapi, python, 30days]
category: 'coding'
draft: false 
lang: ''
---


On **Day 25**, we enter the home stretch: **Deployment**. It's time to package your application so it can run on any machine in the world, regardless of whether they have Python installed.

Today is all about **Docker**. We are going to "containerize" our FastAPI app. This ensures that the exact environment you have on your laptop—with all its specific versions and dependencies—is the exact environment that runs in production.


### 1. Why Docker?

Docker creates an isolated environment. This solves the "dependency hell" where your app works on your Mac but breaks on a Linux server because of a different Python version or a missing system library.

### 2. The Optimized `Dockerfile`

Using **uv** inside Docker is a game-changer. It allows us to use a high-performance cache and avoids the overhead of traditional virtual environments inside the container.

```dockerfile
# Use a slim Python image
FROM python:3.11-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set the working directory
WORKDIR /app

# Copy dependency files first (for better caching)
COPY pyproject.toml uv.lock ./

# Install dependencies without creating a virtualenv (efficient for Docker)
RUN uv sync --frozen --no-dev

# Copy the rest of the application
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Run the application using uvicorn
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

```

### 3. Understanding the Build Process

When you run `docker build`, Docker executes these steps as "layers." By copying `pyproject.toml` first, Docker "remembers" your dependencies. If you change your code but don't add new libraries, Docker skips the `uv sync` step entirely!

### 4. Running the Container

Once built, you can run your entire API with one command:

```bash
docker build -t my-fastapi-app .
docker run -p 8000:8000 my-fastapi-app

```

### 🛠️ Implementation Checklist

* [x] Created a `Dockerfile` in the root directory.
* [x] Added a `.dockerignore` file to keep the image slim (ignoring `__pycache__` and `.env`).
* [x] Built the image using the `uv` optimized flow.
* [x] Ran the container locally and verified the `/docs` are accessible.
* [x] Verified that the container correctly picks up variables if passed via `docker run --env-file .env`.

---

## 📚 Resources

1. **Official Docs:** [FastAPI in Docker - User Guide](https://fastapi.tiangolo.com/deployment/docker/)
2. **uv Docs:** [Using uv in Docker](https://www.google.com/search?q=https://docs.astral.sh/uv/guides/docker/)
3. **Book:** *FastAPI: Modern Python Web Development* (Chapter 11: Containerization).