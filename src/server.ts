import pg from 'pg';
import express from 'express';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const showDepartments = async(): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.query('SELECT departments_name, id FROM departments');
        console.log(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await pool.end();
    }
}

const showRoles = async(): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.query('SELECT role_name, id, salary FROM roles');
        console.log(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await pool.end();
    }
}

const showEmployees = async(): Promise<void> => {
    try {
        await pool.connect();
        const result = await pool.query('SELECT employees.id, employees.first_name, employees.last_name, employees.employee_role, employees.manager, departments.department_name, roles.salary FROM employees');
        console.log(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await pool.end();
    }
}

app.use((_req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // functions to insert data into db

  const insertDepartment = async (name: string) => {
    const query = `INSERT INTO departments.department_name VALUES ($1) RETURNING *`;
    try {
        const result = await pool.query(query, [name]);  // Using parameterized query
        console.log('Department inserted:', result.rows[0]);  // Log the inserted user
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    };

    const insertRole = async (name: string, salary: number, departmentName: string) => { // follow suit for other functionality needed
        const query = `INSERT INTO roles (role_name, salary, department_name) VALUES ($1, $2, $3) RETURNING *`;
        try {
            const result = await pool.query(query, [name, salary, departmentName]); 
            console.log('Department inserted:', result.rows[0]);  
          } catch (error) {
            console.error('Error inserting data:', error);
          }
        };
    
        const insertEmployee = async (firstName: string, lastName: string, role: string, manager: string) => {
            const query = `INSERT INTO employees (first_name, last_name, role, manager) VALUES ($1, $2, $3, $4) RETURNING *`;
            try {
                const result = await pool.query(query, [firstName, lastName, role, manager]); 
                console.log('Employee inserted:', result.rows[0]);  
              } catch (error) {
                console.error('Error inserting data:', error);
              }
            };
        
    const updateRole = async (employeeName: string, newRole: string) => {
        const query = `UPDATE employees SET role = ${newRole} WHERE last_name = ${employeeName} VALES ($1, $2) RETURNING *`;
        try {
            const result = await pool.query(query, [employeeName, newRole]);
            console.log('Employee role updated', result.rows[0]);
        } catch (error) {
            console.error('Error inserting data:', error);
          }
    };
    
  

export { showDepartments,  showRoles, showEmployees, insertDepartment, insertRole, insertEmployee, updateRole };


// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 