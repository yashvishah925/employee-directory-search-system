# Employee Directory Search System

A full-stack Employee Directory Search application that allows HR teams to search and view employee information by name or department.

## Features

- Search employees by name or department.
- Display employee details in clean, organised cards.
- Show employee ID, name, email, department, designation and date of joining.
- Display a message when no employees match the search.
- Handle loading and server connection errors.
- Search results are fetched dynamically from the database through a REST API.
- Debounced search to reduce unnecessary API requests.
- Request cancellation to prevent outdated search results from appearing.

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Python, FastAPI |
| Database | MySQL |
| Database connection | SQLAlchemy, PyMySQL |
| API documentation | FastAPI Swagger UI |

## Project Structure

```text
employee-directory/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── exceptions.py
│   │   └── schemas.py
│   ├── schema.sql
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## Database Setup

MySQL is used because employee information is structured and relational.

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open and execute `backend/schema.sql`.
4. This creates the `employee_directory` database and the `employees` table.
5. It also inserts sample employee records.

### Employee Table

| Column | Description |
|---|---|
| id | Unique employee ID |
| name | Employee name |
| email | Employee email |
| department | Employee department |
| designation | Employee job title |
| date_of_joining | Employee joining date |

Indexes are created on the employee name and department columns to support searching.

## Installation and Setup

### Prerequisites

- Python 3.10 or later
- Node.js and npm
- MySQL Server and MySQL Workbench

### 1. Backend Setup

Open a terminal in the project directory:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder using `.env.example` as a reference.

Add your own MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=employee_directory
CORS_ORIGINS=http://localhost:5173
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

Backend URL: http://localhost:8000

API documentation: http://localhost:8000/docs

### 2. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173

Keep both the backend and frontend servers running while using the application.

## API Endpoint

### Get Employees

**GET** `/employees`

Returns employee records from the database.

| Parameter | Description |
|---|---|
| search | Search by employee name or department |
| limit | Maximum number of records returned |
| offset | Number of records to skip |

Example:

```text
GET http://localhost:8000/employees?search=rah
```

The API returns matching employee records in JSON format.

## Search Performance and Optimisation

The application uses multiple techniques to make searching more efficient.

### Frontend Optimisation

- **Debouncing:** Waits 500 milliseconds after the user stops typing before sending a search request. This avoids sending a request for every keystroke.
- **AbortController:** Cancels older requests when a new search begins, helping prevent outdated results from being displayed.

### Backend Optimisation

- **Database indexing:** Indexes are created on the name and department columns to support search queries.
- **Starts-with search:** Uses prefix matching instead of searching anywhere within a string. This can allow MySQL to use suitable indexes.
- **Pagination:** Uses LIMIT and OFFSET to control how many records are returned.
- **Column selection:** Fetches only the employee fields required by the application.
- **Connection pooling:** SQLAlchemy reuses database connections rather than creating a new connection for every request.
- **Parameterized queries:** Search values are passed as parameters to help prevent SQL injection.

### Future Improvements

- Add MySQL FULLTEXT search if more flexible text searching is required.
- Add authentication for HR users.
- Add employee creation, editing and deletion.
- Add more advanced filtering and pagination controls.

## Error Handling

The application handles common errors, including:

- Invalid or empty search queries.
- Invalid query parameters.
- Database connection failures.
- Backend server connection failures.
- Searches that return no matching employees.

## Author

Developed as a full-stack Software Development Engineering assignment using React, FastAPI and MySQL.