from sqlalchemy import text
from app.database import engine


def _escape_like(value: str) -> str:
    """Make % and _ typed by the user behave as normal characters."""
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def find_employees(search: str | None, limit: int, offset: int) -> list[dict]:
    # Select only the columns we need
    sql = """
        SELECT id, name, email, department, designation, date_of_joining
        FROM employees
    """
    params = {"limit": limit, "offset": offset}

    if search:
        # 'rah%' (starts-with) can use the index, but '%rah%' cannot
        sql += " WHERE name LIKE :term OR department LIKE :term"
        params["term"] = _escape_like(search) + "%"

    sql += " ORDER BY name LIMIT :limit OFFSET :offset"

    with engine.connect() as conn:
        rows = conn.execute(text(sql), params).mappings().all()
        return [dict(row) for row in rows]