DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee_dept (
    deptId INT NOT NULL AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(deptId)
);
CREATE TABLE employee_role (
    roleId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NULL,
    deptId INT,
    PRIMARY KEY(roleId),
    FOREIGN KEY(deptId) REFERENCES employee_dept(deptId)
);
CREATE TABLE employee (
    employeeId INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    managerId INT,
    roleId INT,
    PRIMARY KEY(employeeId),
    FOREIGN KEY(roleId) REFERENCES employee_role(roleId),
    FOREIGN KEY(managerId) REFERENCES employee(employeeId)
);