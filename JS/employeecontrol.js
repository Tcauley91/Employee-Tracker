const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8080,

  // Your username
  user: "root",

  // Your password
  password: "Brandon?!123",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add departments, roles, employees",
          "View departments, roles, employees",
          "Update employee roles",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add departments, roles, employees":
          addAll();
          break;
  
        case "View departments, roles, employees":
          viewAll();
          break;
  
        case "Update employee roles":
          updateEmployee();
          break;
        }
      });
  }