---
title: Day 27 of 30 Days of FastAPI - Logging & Observability - Watching Your API Breathe
published: 2026-01-19
description: 'Learn how to implement professional logging in FastAPI to monitor your API and debug issues.'
image: './logging.webp'
tags: [fastapi, python, 30days]
category: 'coding'
draft: false 
lang: ''
---

On **Day 27**, we move from "building" to **"Observability."** It's time to realize that once your API is running in a Docker container, you can't just rely on `print()` statements to know what's going wrong. Today, we implement professional **Logging**. We want to capture every request, every error, and every database query in a structured way that makes debugging a breeze.

We are adding the "eyes and ears" to our application. When an error occurs in a containerized environment, logs are your only lifeline.

### 1. Why Structured Logging?

Standard Python logs are just strings of text. **Structured Logs** (usually in JSON format) turn those strings into searchable data. Instead of searching for "User not found," you can query for `{"event": "login_failed", "user_id": 123}`.

### 2. Implementing a Request Logger

We can use the Middleware concept from Day 12 to log every request that hits our server.

```python
import logging
import time
from fastapi import Request

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("api_logger")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    
    # Log details as a structured-like message
    logger.info(
        f"method={request.method} path={request.url.path} "
        f"status={response.status_code} duration={process_time:.2f}ms"
    )
    
    # Keep the custom header for backward compatibility
    response.headers["X-Process-Time"] = f"{process_time / 1000:.4f}s"
    
    return response

```

### 3. Integrating with our Global Exception Handler

Remember our custom exception handler from Day 8? We should update it to log the full traceback when an error occurs. This ensures that even when the user sees a "clean" error message, we have the "dirty" details in our logs for fixing.

```python
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    # Log the error before returning the response
    logger.error(f"HTTP Error: {exc.detail} path={request.url.path} code={exc.status_code}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail,
            "path": request.url.path,
            "code": exc.status_code,
            "timestamp": datetime.now().isoformat()
        },
    )

```

### 4. Log Rotation

In Docker, logs can fill up your disk quickly. I learned that it's better to let Docker handle the log rotation or use a library like `loguru` to manage file sizes automatically.

### 🛠️ Implementation Checklist

* [x] Configured the root logger in `main.py`.
* [x] Added a request logging middleware.
* [x] Integrated logging into the global exception handler.
* [x] Verified that logs appear in the `docker-compose logs -f` output.
* [x] Confirmed that sensitive data (like passwords) is NEVER logged.

---

## 📚 Resources

1. **Official Docs:** [Uvicorn Logging](https://www.google.com/search?q=https://www.uvicorn.org/settings/%23logging)
2. **Library:** [Structlog: Structured Logging for Python](https://www.structlog.org/en/stable/)
3. **Book:** *FastAPI: Modern Python Web Development* (Chapter 12: Logging and Monitoring).
