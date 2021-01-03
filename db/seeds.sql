USE employee_DB;

/* Insert some records into department table */
INSERT INTO department(name)
VALUES("Engineering");

INSERT INTO department(name)
VALUES("Sales");

INSERT INTO department(name)
VALUES("Marketing");

/* Insert some records into role table */
INSERT INTO role(title, salary, department_id)
VALUES("Intern", 66599.99, (SELECT id from department WHERE name="Engineering"));

INSERT INTO role(title, salary, department_id)
VALUES("Engineer I", 76599.99, (SELECT id from department WHERE name="Engineering"));

INSERT INTO role(title, salary, department_id)
VALUES("Engineer II", 86599.99, (SELECT id from department WHERE name="Engineering"));

INSERT INTO role(title, salary, department_id)
VALUES("Engineer III", 96599.99, (SELECT id from department WHERE name="Engineering"));

INSERT INTO role(title, salary, department_id)
VALUES("Engineering Manager", 126599.99, (SELECT id from department WHERE name="Engineering"));

INSERT INTO role(title, salary, department_id)
VALUES("Analyst", 57899.99, (SELECT id from department WHERE name="Marketing"));

INSERT INTO role(title, salary, department_id)
VALUES("Sales Engineer", 76699.88, (SELECT id from department WHERE name="Sales"));

/* Insert some records into employee table */
INSERT INTO employee(first_name, last_name, role_id)
VALUES("Jane", "Doe", (SELECT id from role WHERE title="Sales Engineer"));

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Mary", "Twain", (SELECT id from role WHERE title="Analyst"));

INSERT INTO employee(first_name, last_name, role_id)
VALUES("John", "Doe", (SELECT id from role WHERE title="Engineering Manager"));

SELECT @managerId:=id FROM employee WHERE first_name="John" AND last_name="Doe";

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Johnny", "Lever", (SELECT id from role WHERE title="Engineer I"), @managerId);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kate", "Kirsten", (SELECT id from role WHERE title="Engineer II"), @managerId);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Bob", "Carleton", (SELECT id from role WHERE title="Engineer III"), @managerId);