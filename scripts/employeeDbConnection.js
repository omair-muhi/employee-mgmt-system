/**
 * References
 * iceCreamCRUD.js (Week-12-Activity #9)
 * */
const mysql = require('mysql');
const cTable = require('console.table');
class employeeDbConnection {
    /**
     * Create connection object and open
     * DB connection
     */
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',

            // Your port; if not 3306
            port: 3306,

            // Your username
            user: 'root',

            // Be sure to update with your own MySQL password!
            password: 'B@by2018',
            database: 'employee_DB',
        });
    }

    /**
     * Read all department records
     */
    readDepartmentTableAll() {
        this.connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            // console.log(res);
            console.table(res);
        });
    }
    readRoleTableAll() {
        this.connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
    readEmployeeTableAll() {
        this.connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
    addDepartment(name) {
        console.log(`Adding ${name} department...\n`);
        const query = this.connection.query(
            'INSERT INTO department SET ?', {
                name: name
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department inserted!\n`);
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    }
    deleteDeparment(name) {
        console.log(`Deleting ${name} deparment...\n`);
        this.connection.query(
            'DELETE FROM department WHERE ?', {
                name: name,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department deleted!\n`);
            }
        );
    }
    addRole(title, salary, departmentName) {
        console.log(`Adding ${title} role...\n`);
        // query from department ID based on name
        this.connection.query('SELECT id FROM department WHERE ?', {
            name: departmentName
        }, (err, res) => {
            if (err) throw err;
            // save department id
            const departmentId = res[0].id;
            // second nested query for inserting new role
            const query = this.connection.query(
                'INSERT INTO role SET ?', {
                    title: title,
                    salary: salary,
                    department_id: departmentId
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role inserted!\n`);
                }
            );
            // logs the actual query being run
            console.log(query.sql);
        });
    }
    deleteRole(title) {
        console.log(`Deleting ${title} role...\n`);
        this.connection.query(
            'DELETE FROM role WHERE ?', {
                title: title,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role(s) deleted!\n`);
            }
        );
    }
    addReportingEmployee(firstName, lastName, title, mgrFirstName, mgrLastName) {
        if ((mgrFirstName == null) || (mgrLastName == null)) {
            console.log("Please provide manager first and last name.");
            return;
        }
        console.log(`Adding ${lastName}, ${firstName} employee...\n`);
        // query role_id by title
        this.connection.query('SELECT id FROM role WHERE ?', {
            title: title
        }, (err, res) => {
            if (err) throw err;
            // save role id
            const roleId = res[0].id;
            // nested query to populate manager_id
            const query = this.connection.query(
                'SELECT id FROM employee WHERE first_name=? AND last_name=?', [mgrFirstName, mgrLastName],
                (err, res) => {
                    if (err) throw err;
                    // save manager_id
                    const managerId = res[0].id;
                    // third nested query for inserting new employee
                    const query = this.connection.query(
                        'INSERT INTO employee SET ?', {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: managerId
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee inserted!\n`);
                        }
                    );
                }
            );
        });
    }
    addNonReportingEmployee(firstName, lastName, title) {
        console.log(`Adding ${lastName}, ${firstName} employee...\n`);
        // query role_id by title
        this.connection.query('SELECT id FROM role WHERE ?', {
            title: title
        }, (err, res) => {
            if (err) throw err;
            // save role id
            const roleId = res[0].id;
            // second nested query for inserting new employee
            const query = this.connection.query(
                'INSERT INTO employee SET ?', {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee inserted!\n`);
                }
            );
        });
    }
    deleteEmployee(firstName, lastName) {
        console.log(`Deleting ${lastName},${firstName} employee...\n`);
        this.connection.query(
            'DELETE FROM employee WHERE first_name=? AND last_name=?', [firstName, lastName],
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee(s) deleted!\n`);
            }
        );
    }
    updateEmployeeRole(firstName, lastName, newTitle) {
        this.connection.query('SELECT id FROM role WHERE ?', {
                title: newTitle
            },
            (err, res) => {
                if (err) throw err;
                const newRoleId = res[0].id;
                this.connection.query(
                    'UPDATE employee SET ? WHERE ? AND ?', [{
                        role_id: newRoleId
                    }, {
                        first_name: firstName
                    }, {
                        last_name: lastName
                    }],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} emloyee updated!\n`);
                    }
                );
            }
        );
    }
}

/**
 * Test-code
 */
const employeeDb = new employeeDbConnection();
employeeDb.readEmployeeTableAll();
employeeDb.updateEmployeeRole("Johnny", "Lever", "Intern");
employeeDb.connection.end();