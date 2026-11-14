
CREATE DATABASE IF NOT EXISTS employee_directory;

USE employee_directory;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    date_of_joining DATE NOT NULL,

    INDEX idx_employees_name (name),
    INDEX idx_employees_department (department)
);

INSERT INTO employees
(name, email, department, designation, date_of_joining)
VALUES
('Rahul Sharma', 'rahul.sharma@company.com', 'Engineering', 'Software Engineer', '2022-03-14'),
('Priya Patel', 'priya.patel@company.com', 'Design', 'UI Designer', '2021-07-01'),
('Rahul Verma', 'rahul.verma@company.com', 'Sales', 'Sales Manager', '2020-01-20'),
('Anjali Mehta', 'anjali.mehta@company.com', 'Engineering', 'Tech Lead', '2019-11-05'),
('Sneha Iyer', 'sneha.iyer@company.com', 'HR', 'HR Executive', '2023-02-10'),
('Karan Singh', 'karan.singh@company.com', 'Marketing', 'Marketing Analyst', '2022-09-18');
