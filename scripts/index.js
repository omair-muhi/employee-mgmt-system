/**
 * References:
 * greatBayBasic.js (Week-12-Activity# 10)
 */
const inquirer = require('inquirer'); // command-line UI
const employeeDbConnection = require('./employeeDbConnection');
const start = () => {
    inquirer
        .prompt({
            name: 'mainScreen',
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
                'EXIT'
            ],
        })
        .then((answer) => {
            // based on their answer, either call the bid or the post functions
            if (answer.mainScreen === 'Add department') {
                console.log("Call add department");
                start();
            } else if (answer.mainScreen === 'Delete role') {
                console.log("Call delete role");
                start();
            } else if (answer.mainScreen === 'EXIT') {
                employeeDb.connection.end();
            }
        });
};
// connect to the mysql server and sql database
const employeeDb = new employeeDbConnection();
employeeDb.connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});