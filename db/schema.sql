DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30),
  FOREIGN KEY (id) REFERENCES employees(id),
  FOREIGN KEY (department_name) REFERENCES roles(department_name)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  employee_role VARCHAR (30),
  manager VARCHAR (30),
  FOREIGN KEY (id) REFERENCES departments(id),
  FOREIGN KEY (employee_role) REFERENCES roles(id)

);

CREATE TABLE roles  (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(30),
    salary INTEGER,
    department_name VARCHAR (30),
    FOREIGN KEY (id) REFERENCES employees(employee_role),
    FOREIGN KEY (department_name) REFERENCES departments(department_name)
)

JOIN departments ON employees.id = departments.id
JOIN employees ON roles.id = employees.employee_role

