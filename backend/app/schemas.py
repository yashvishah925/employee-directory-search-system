from datetime import date
from pydantic import BaseModel


class EmployeeOut(BaseModel):
    id: int
    name: str
    email: str
    department: str
    designation: str
    date_of_joining: date