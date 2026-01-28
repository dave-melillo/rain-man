"""Rain Man Casino Strategy API"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import blackjack, craps, poker

app = FastAPI(
    title="Rain Man API",
    description="Casino strategy calculator API",
    version="1.0.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(blackjack.router, prefix="/api/blackjack", tags=["blackjack"])
app.include_router(craps.router, prefix="/api/craps", tags=["craps"])
app.include_router(poker.router, prefix="/api/poker", tags=["poker"])


@app.get("/")
def root():
    return {"message": "Rain Man API", "status": "operational"}


@app.get("/health")
def health():
    return {"status": "healthy"}
