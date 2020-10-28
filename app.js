const inquirer = require("inquirer")
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ilovemerrbear1",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start()

});

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Where would you like to start?",
            choices: [
                "View departments",
                "View employee roles",
                "View all employees",
                "Update employee roles",
                "Add department",
                "Add role",
                "Add employee"
            ]
        }
    ]).then(function (val) {
        switch (val.choice) {
            case "View departments":
                viewDepartments()
                break;

            case "View employee roles":
                viewRoles()
                break;
            case "View all employees":
                viewEmployees()
                break;

            case "Update employee roles":

                break;

            case "Add department":
                addDepartment()
                break;

            case "Add role":
                addRole()
                break;

            case "Add employee":

                break;

        }
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
}

function viewRoles() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
}

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ?",
            {
                name: res.name
            },
            function (err) {
                if (err) throw err
                console.table(res)
                start()
            }
        )
    })

}

function addRole() {
    inquirer.prompt([
        {
            name: "newRole",
            type: "input",
            message: "What is the name of the new role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the department id of the role?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role SET ?",
            {
                title: res.newRole,
                salary: res.salary,
                department_id: res.departmentId
            },
            function (err) {
                if (err) throw err
                console.table(res)
                start()
            }
        )
    })
}