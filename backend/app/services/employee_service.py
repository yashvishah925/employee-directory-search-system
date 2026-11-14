from sqlalchemy.exc import SQLAlchemyError
from app.repositories import employee_repository
from app.exceptions import InvalidSearchQueryError, DatabaseUnavailableError


def search_employees(search: str | None, limit: int, offset: int) -> list[dict]:
    if search is not None:
        search = search.strip()
        if search == "":
            raise InvalidSearchQueryError("Search query cannot be empty.")

    try:
        return employee_repository.find_employees(search, limit, offset)
    except SQLAlchemyError:
        raise DatabaseUnavailableError("Database is unavailable. Please try again later.")