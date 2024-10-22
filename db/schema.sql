DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30),
  FOREIGN KEY (id) REFERENCES employees(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  employee_name VARCHAR(30),
  employee_role VARCHAR (30),
  FOREIGN KEY (id) REFERENCES departments(id),
  FOREIGN KEY (employee_role) REFERENCES roles(id)

);

CREATE TABLE roles  (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(30),
    FOREIGN KEY (id) REFERENCES
)



view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role