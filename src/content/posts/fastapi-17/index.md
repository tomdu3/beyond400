---
title: Day 17 of 30 Days of FastAPI - JWTs and Password Hashing - The Security Deep Dive
published: 2026-01-08
description: 'Learn how to implement secure password hashing and JWT authentication in FastAPI using passlib and python-jose.'
image: './'
tags: [fastapi, python, 30days]
category: 'coding'
draft: true 
lang: ''
---

Ok, now we are getting into the deep end. We are building the logic that makes our authentication "real." We have two goals: protect stored passwords and issue secure session tokens.

### 1. Secure Password Hashing

Storing a password as "password123" in a database is a disaster waiting to happen. We use `passlib` to "hash" it—a one-way transformation that is impossible to reverse.

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

```

### 2. Generating JWT Tokens

A JWT is a signed string that contains "claims" (like user ID and expiry). Because it’s signed with a **SECRET_KEY**, the client cannot change the data without breaking the signature.

```python
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-super-secret-key-here"  # TODO: Move to .env
ALGORITHM = "HS256"  # TODO: Move to .env

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

```

### 3. Why JWT?

Unlike session cookies, JWTs are **stateless**. The server doesn't need to remember every logged-in user in its memory; it just validates the token's signature. This makes your API incredibly easy to scale.

### 🛠️ Implementation Checklist

* [x] Installed `passlib[bcrypt]` and `python-jose[cryptography]` using **uv**.
* [x] Created a utility file for hashing and verifying passwords.
* [x] Implemented the `create_access_token` function.
* [x] Updated the `/token` endpoint to return a real JWT instead of a dummy string.
* [x] Verified that the token expires correctly after the set time.

---

## 📚 Resources

1. **Official Docs:** [FastAPI OAuth2 with Password and Bearer](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
2. **Book:** *FastAPI: Modern Python Web Development* (Chapter 7: JWT and Password Hashing).