import express from 'express';
import { pool, connectToDb } from './connection.js';
import { mainInquirer } from './inquiries.js'

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const showDepartments = async (): Promise<void> => {
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

const showRoles = async (): Promise<void> => {
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

const showEmployees = async (): Promise<void> => {
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


// functions to insert data into db, referenced in inquiries

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



app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mainInquirer();




export { showDepartments, showRoles, showEmployees, insertDepartment, insertRole, insertEmployee, updateRole };

