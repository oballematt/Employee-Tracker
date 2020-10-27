const inquirer = require("inquirer")
const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  
});

function start(){
    inquirer.prompt([
        {
            type: "input",
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
    ]).then(function(val) {
        switch (val.choice) {
            case "View departments":
              
            break;
    
          case "View employee roles":
              
            break;
          case "View all employees":
            
            break;
          
          case "Update employee roles":
               
              break;

          case "Add department":
              
              break;
      
            case "Add role":
              
              break;
      
            case "Add employee":
              
              break;
    
            }
    })
}