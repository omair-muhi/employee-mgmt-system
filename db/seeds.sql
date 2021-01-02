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
VAUES("Intern", 66599.99, (SELECT id from department WHERE name="Engineering"));