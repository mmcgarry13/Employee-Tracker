import inquirer from 'inquirer';
import { showDepartments, showEmployees, showRoles, insertRole, insertDepartment, insertEmployee, updateRole } from './server.js';

const mainInquirer = (): void => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainInquirerPrompt',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'End'
                ],
            }
        ])
        .then((answers) => {
            if (answers.mainInquirerPrompt === 'View all departments') {
                showDepartments();
            } else if (answers.mainInquirerPrompt === 'View all roles') {
                showRoles();
            } else if (answers.mainInquirerPrompt === 'View all employees') {
                showEmployees();
            } else if (answers.mainInquirerPrompt === 'Add a department') {
                insertDepartmentPrompt();
            } else if (answers.mainInquirerPrompt === 'Add a role') {
                insertRolePrompt();
            } else if (answers.mainInquirerPrompt === 'Add an employee') {
                insertEmployeePrompt();
            } else if (answers.mainInquirerPrompt === 'Update employee role') {
                updateRolePrompt();
            } else if (answers.mainInquirerPrompt === 'End') {
                console.log('Have a nice day!');
                return
            }
        });
};

//Functions to take user input then run user input through SQL updating/inserting queries

const insertRolePrompt = (): void => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter name of the new role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary of the new role',
            },
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department for the new role',
            },
        ])
        .then((answers) => {
            insertRole(answers.name, answers.salary, answers.department);
            mainInquirer();
        })
};

const insertDepartmentPrompt = (): void => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the new department',
            },
        ])
        .then((answers) => {
            insertDepartment(answers.name);
            mainInquirer();
        })
};


const insertEmployeePrompt = (): void => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the new employee',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the new employee',
            },
            {
                type: 'input',
                name: 'role',
                message: 'Enter the role of the new employee',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Enter the manager of the new employee',
            },
        ])
        .then((answers) => {
            insertEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);
            mainInquirer();
        })
};

const updateRolePrompt = (): void => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee',
                message: 'Which employees role are you updating (last name)?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the new role for this employee?'
            }
        ])
        .then((answers) => {
            updateRole(answers.employee, answers.role);
            mainInquirer();
        })
};

export { mainInquirer }