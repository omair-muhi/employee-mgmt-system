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