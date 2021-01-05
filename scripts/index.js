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
                'Add employee w/ manager',
                'Add employee w/o manager',
                new inquirer.Separator(),
                'View all departments',
                'View all roles',
                'View all employees',
                new inquirer.Separator(),
                'Delete department',
                'Delete role',
                'Delete employee',
                new inquirer.Separator(),
                'Update employee role',
                'Update employee manager',
                new inquirer.Separator(),
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
                        message: 'Enter name of new department:'
                    }]).then((answer) => {
                        employeeDb.addDepartment(answer.deptName);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'Add role':
                    inquirer.prompt([{
                            name: 'title',
                            type: 'input',
                            message: 'Enter title of new role:'
                        },
                        {
                            name: 'salary',
                            type: 'number',
                            message: 'Enter salary of new role:'
                        },
                        {
                            name: 'department',
                            type: 'input',
                            message: 'Enter department of new role:'
                        }
                    ]).then((answer) => {
                        employeeDb.addRole(answer.title, answer.salary, answer.department);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'Add employee w/ manager':
                    inquirer.prompt([{
                            name: 'first',
                            type: 'input',
                            message: 'Enter first name of new employee:'
                        },
                        {
                            name: 'last',
                            type: 'input',
                            message: 'Enter last name of new employee:'
                        },
                        {
                            name: 'title',
                            type: 'input',
                            message: 'Enter title of new employee:'
                        }, {
                            name: 'mgrFirst',
                            type: 'input',
                            message: 'Enter first name of new employee\'s manager:'
                        },
                        {
                            name: 'mgrLast',
                            type: 'input',
                            message: 'Enter last name of new employee\'s manager:'
                        },

                    ]).then((answer) => {
                        employeeDb.addReportingEmployee(answer.first, answer.last, answer.title, answer.mgrFirst, answer.mgrLast);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'Add employee w/o manager':
                    inquirer.prompt([{
                            name: 'first',
                            type: 'input',
                            message: 'Enter first name of new employee:'
                        },
                        {
                            name: 'last',
                            type: 'input',
                            message: 'Enter last name of new employee:'
                        },
                        {
                            name: 'title',
                            type: 'input',
                            message: 'Enter title of new employee:'
                        }
                    ]).then((answer) => {
                        employeeDb.addNonReportingEmployee(answer.first, answer.last, answer.title);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'View all departments':
                    employeeDb.readDepartmentTableAll();
                    start();
                    break;
                case 'View all roles':
                    employeeDb.readRoleTableAll();
                    start();
                    break;
                case 'View all employees':
                    employeeDb.readEmployeeTableAll();
                    start();
                    break;
                case 'Delete department':
                    inquirer.prompt([{
                        name: 'deptName',
                        type: 'input',
                        message: 'Enter name of department:'
                    }]).then((answer) => {
                        employeeDb.deleteDeparment(answer.deptName);
                        start(); // keep app running until user selects EXIT
                    });
                    break;
                case 'Delete role':
                    inquirer.prompt([{
                        name: 'title',
                        type: 'input',
                        message: 'Enter title of role:'
                    }]).then((answer) => {
                        employeeDb.deleteRole(answer.title);
                        start(); // keep app running until user selects EXIT
                    });
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