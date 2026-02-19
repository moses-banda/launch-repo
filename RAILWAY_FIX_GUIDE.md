# Railway FastAPI Backend Deployment Fix Guide

## Problem
Your Railway backend is returning 500 errors, which means the server is crashing or misconfigured.

## Common Issues & Solutions

### 1. Port Configuration ⚠️ MOST COMMON ISSUE
Railway assigns a dynamic PORT environment variable. Your FastAPI app MUST listen on this port.

**Fix your main.py:**
```python
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CRITICAL: Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/waitlist")
def add_to_waitlist(email: str):
    # Your waitlist logic here
    return {"message": "Added to waitlist", "email": email}

# CRITICAL: Use Railway's PORT environment variable
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
```

### 2. Procfile or Start Command
Railway needs to know how to start your app.

**Option A: Create a Procfile**
Create a file named `Procfile` (no extension) in your project root:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Option B: Set Start Command in Railway**
In Railway dashboard → Settings → Deploy → Start Command:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 3. Requirements.txt
Make sure you have all dependencies:
```txt
fastapi
uvicorn[standard]
supabase
python-dotenv
```

### 4. Environment Variables
If you're using Supabase, add these in Railway dashboard → Variables:
- `SUPABASE_URL`
- `SUPABASE_KEY`

### 5. Check Railway Logs
1. Go to Railway dashboard
2. Click on your deployment
3. Click "Deployments" tab
4. Click on the latest deployment
5. Check the logs for error messages

## Testing Steps

1. **Test locally first:**
   ```bash
   cd your-backend-folder
   uvicorn main:app --reload
   ```
   Visit http://localhost:8000/docs

2. **Deploy to Railway:**
   - Push your changes to GitHub
   - Railway will auto-deploy
   - Check logs for errors

3. **Use the test tool:**
   Visit: http://localhost:5173/test-backend.html
   (or wherever your dev server is running)

## Quick Checklist
- [ ] CORS middleware added
- [ ] Port uses $PORT environment variable
- [ ] Procfile or start command configured
- [ ] All dependencies in requirements.txt
- [ ] Environment variables set in Railway
- [ ] Logs checked for specific errors

## Example Working Backend Structure
```
backend/
├── main.py           # Your FastAPI app
├── requirements.txt  # Dependencies
├── Procfile         # Start command (optional if using Railway settings)
└── .env             # Local env vars (don't commit this!)
```

## Still Not Working?
Check Railway logs and look for:
- "Address already in use" → Port issue
- "Module not found" → Missing dependency
- "Connection refused" → Database/Supabase connection issue
- CORS errors → Missing CORS middleware
