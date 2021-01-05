/**
 * References:
 * greatBayBasic.js (Week-12-Activity# 10)
 */
const inquirer = require('inquirer'); // command-line UI
const employeeDbConnection = require('./employeeDbConnection');
const start = () => {
    inquirer
        .prompt({
            name: 'mainPrompt',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'View all departments',
                'View all roles',
                'View all employees',
                'Delete department',
                'Delete role',
                'Delete employee',
                'Update employee role',
                'Update employee manager',
                'EXIT'
            ],
        })
        .then((answer) => {
            // process first-level main-prompt
            switch (answer.mainPrompt) {
                case 'Add department':
                    inquirer.prompt([{
                        name: 'deptName',
                        type: 'input',
                        message: 'Enter name of department:'
                    }]).then((answer) => {
                        employeeDb.addDepartment(answer.deptName);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'Add role':
                    start();
                    break;
                case 'Add employee':
                    start();
                    break;
                case 'View all departments':
                    start();
                    break;
                case 'View all roles':
                    start();
                    break;
                case 'View all employees':
                    start();
                    break;
                case 'Delete department':
                    start();
                    break;
                case 'Delete role':
                    start();
                    break;
                case 'Delete employee':
                    start();
                    break;
                case 'Update employee role':
                    start();
                    break;
                case 'Update employee manager':
                    start();
                    break;
                case 'EXIT':
                default:
                    employeeDb.connection.end();
            }
        });
};
// create a new DB object and connect to server
const employeeDb = new employeeDbConnection();
employeeDb.connection.connect((err) => {
    if (err) throw err;
    // entry point of the CLI
    start();
});