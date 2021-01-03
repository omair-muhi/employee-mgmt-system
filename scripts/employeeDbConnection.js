/**
 * References
 * iceCreamCRUD.js (Week-12-Activity #9)
 * */
const mysql = require('mysql');
class employeeDbConnection {
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
    readDepartmentTableAll() {
        this.connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            this.connection.end();
        });
    }
    readRoleTableAll() {
        this.connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            this.connection.end();
        });
    }
    readEmployeeTableAll() {
        this.connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            this.connection.end();
        });
    }
    addDepartment(name) {
        console.log(`Adding ${name} department...\n`);
        const query = this.connection.query(
            'INSERT INTO department SET ?', {
                name: name,
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
}

const employeeDb = new employeeDbConnection();
employeeDb.readDepartmentTableAll();
// employeeDb.addDepartment("Finance");
employeeDb.deleteDeparment("Finance");