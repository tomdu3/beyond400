---
title: Day 24 of 30 Days of FastAPI - Refactoring for Scalability with APIRouter
published: 2026-01-16
description: 'Learn how to manage environment variables and sensitive configuration in FastAPI using Pydantic Settings and .env files for better security and portability.'
image: './architecture.webp'
tags: [fastapi, python, 30days]
category: 'coding'
draft: false 
lang: ''
---

On **Day 24**, we are moving from a "single-file" project to a **professional-grade architecture**.

It's time to refactor! While keeping everything in `main.py` was great for learning, it becomes a nightmare to maintain as your app grows. Today, we learn the **"Big Project"** structure used by companies like Netflix and Uber for their FastAPI services.

Therefore, today is all about organization. If your `main.py` is over 200 lines long, it’s time to refactor.

## 1. The "Standard" Big Project Structure

Here is how we are reorganizing our files today:

```text
app/
├── __init__.py
├── main.py              # App initialization and router imports
├── database.py          # SQLAlchemy engine and session
├── config.py            # Pydantic Settings (.env)
├── security.py          # Security utilities (JWT, hashing)
├── dependencies.py      # Shared dependencies and background tasks
├── routers/
│   ├── __init__.py
│   ├── users.py         # Auth and User-related endpoints
│   ├── items.py         # Item-related endpoints
│   └── misc.py          # Miscellaneous endpoints (root, info, uploads)
├── models/
│   ├── __init__.py
│   ├── user.py          # SQLAlchemy models
│   └── item.py
└── schemas/
    ├── __init__.py
    ├── user.py          # Pydantic models (schemas)
    └── item.py

```

## 2. Using `APIRouter`

Instead of attaching everything to `app = FastAPI()`, we create routers in separate files. This makes our code modular.

**In `routers/items.py`:**

```python
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix="/items",
    tags=["items"],
)

@router.get("/")
async def read_items():
    return [{"item_id": "Portal Gun"}]

```

**In `main.py`:**

```python
from app.routers import items, users, misc

app = FastAPI()

app.include_router(users.router)
app.include_router(users.user_router)
app.include_router(items.router)
app.include_router(misc.router)

```

## 3. Why `tags` and `prefix` matter?

* **Prefix:** Automatically adds `/items` to every route in that file. It saves typing and prevents errors.
* **Tags:** Automatically groups your endpoints in the **Swagger UI** under nice headings, making your documentation much easier to navigate.

## 🛠️ Implementation Checklist

* [x] Created the `app/` directory and moved logic into subfolders.
* [x] Split Pydantic schemas from SQLAlchemy models.
* [x] Implemented `APIRouter` for Items and Users.
* [x] Updated all imports to reflect the new structure (using absolute imports like `app.models.item`).
* [x] Verified that the API still runs and the `/docs` look more organized than ever.

---

## 📚 Resources

1. **Official Docs:** [FastAPI Bigger Applications - Multiple Files](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
2. **Blog:** [FastAPI Best Practices (Architecture)](https://github.com/zhanymkanov/fastapi-best-practices)
