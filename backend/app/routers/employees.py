from fastapi import APIRouter, Query
from app.schemas import EmployeeOut
from app.services import employee_service

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("", response_model=list[EmployeeOut])
def get_employees(
    search: str | None = Query(None, max_length=50, description="Name or department"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    # The route only receives the request and calls the service
    return employee_service.search_employees(search, limit, offset)