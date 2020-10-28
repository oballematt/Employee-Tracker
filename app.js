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
                updateEmployee()
                break;

            case "Add department":
                addDepartment()
                break;

            case "Add role":
                addRole()
                break;

            case "Add employee":
                addEmployee()
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
    connection.query("SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id",
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
function addEmployee() {
    inquirer.prompt([
        {
            name: "newFirst",
            type: "input",
            message: "What is the new employees first name?"
        },
        {
            name: "newLast",
            type: "input",
            message: "What is the new employees last name?"
        },
        {
            name: "newId",
            type: "input",
            message: "What is the new employees Id?",

        },
        {
            name: "employeeManager",
            type: "input",
            message: "What is the id of the employee's manager? Enter value of 0 if adding a new manager",

        }
    ]).then(function (res) {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: res.newFirst,
                last_name: res.newLast,
                role_id: res.newId,
                manager_id: res.employeeManager

            },
            function (err) {
                if (err) throw err
                console.table(res)
                start()
            }
        )

    })
}

function updateEmployee() {
    connection.query("SELECT employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "firstname",
                type: "list",
                message: "What is the name of the employee you would like to change?",
                choices: function () {
                    const firstname = [];
                    for (let i = 0; i < res.length; i++) {
                        firstname.push(res[i].first_name)
                    }
                    return firstname
                }
            },
            {
                name: "newRole",
                type: "list",
                message: "What would you like to change this employees title to?",
                choices: role()
            }
        ]).then(function (res) {
            const employeeRole = role().indexOf(res.newRole) + 1
            connection.query("UPDATE employee SET WHERE ?",
                {
                    first_name: res.firstname,
                    role_id: employeeRole

                },

                function (err) {
                    if (err) throw err
                    console.table(res)
                    start()
                })

        })
    })
}

function role() {
    const role = []
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            role.push(res[i].title);
        }

    })
    return role;
}





