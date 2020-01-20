USE employee_trackerDB;

INSERT INTO department (department_name) VALUES ("Engineering Management");
INSERT INTO department (department_name) VALUES ("Engineering");
INSERT INTO department (department_name) VALUES ("Accounting Management");
INSERT INTO department (department_name) VALUES ("Accounting");

INSERT INTO role (title, salary, department_id) VALUES ("SR Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("SR Accountant", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000, 4);




INSERT INTO employee (first_name, last_name, role_id) VALUES ("Chuck", "Norris", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mac", "Miller", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Chris", "Farley", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mike", "Tyson", 4);
