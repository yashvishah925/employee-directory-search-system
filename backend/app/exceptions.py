class InvalidSearchQueryError(Exception):
    """Raised when the search query is empty or invalid."""


class DatabaseUnavailableError(Exception):
    """Raised when the database cannot be reached."""