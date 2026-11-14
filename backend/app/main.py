from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app import config
from app.exceptions import InvalidSearchQueryError, DatabaseUnavailableError
from app.routers import employees

app = FastAPI(title="Employee Directory API")

# Allow the React app to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(employees.router)


@app.exception_handler(InvalidSearchQueryError)
def handle_invalid_search(request: Request, exc: InvalidSearchQueryError):
    return JSONResponse(status_code=400, content={"detail": str(exc)})


@app.exception_handler(DatabaseUnavailableError)
def handle_db_error(request: Request, exc: DatabaseUnavailableError):
    return JSONResponse(status_code=503, content={"detail": str(exc)})