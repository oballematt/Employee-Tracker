DROP DATABASE IF EXISTS employee_db

CREATE DATABASE employee_db

USE employee_db

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee(
     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT NULL
);

INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Legal"),
("finance");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
 ("Salesperson", 80000, 1),
 ("Lead Engineer", 150000, 2),
 ("Software Engineer", 120000, 2),
 ("Accountant", 125000, 3),
 ("Finance Team Lead", 200000, 3),
 ("Legal Team Lead", 250000, 4)
 ("Lawyer", 190000, 4);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ("John", "Doe", 1, null),
 ("Jane", "Johnson", 2, 1),
 ("Mike", "Wazowski", 3, null),
 ("Sully", "Sullivan", 4, 3),
 ("Heather", "Weather", 5, null),
 ("Johnny", "Bravo", 6, 5),
 ("Nathan", "Drake", 7, null),
 ("Crash", "Bandicoot", 8, 7);

