import inquirer from 'inquirer';
import { showDepartments } from './server';

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
                    'Update employee role'],
            }
        ])
        .then((answers) => {
            if (answers == answers[1]) {
                 showDepartments();
            } else if (answers == answers[2]) {}
                 showRoles();

       
      });
};


