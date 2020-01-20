const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

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
          "View All Employees",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {

        case "View All Employees":
          viewEmp();
          break;

        case "Add Employee":
          addEmp();
          break;
  
        case "Add Role":
          addRole();
          break;
  
        case "Add Department":
          addDept();
          break;

        case "Update Employees Role":
          upRole();
          break;

        case "Exit":
          exit();
          break;
        }
      });
  }
// function to view all employees
function viewEmp() {
  connection.query("SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name FROM employee e INNER JOIN role r ON r.department_id = e.role_id JOIN department d ON d.id =r.department_id;", function (err, result) {
      if (err) throw err;

      console.table("", result);
  });
  runSearch();
}

// function to handle posting new Employee
function addEmp() {

  // prompt for info about the new employee
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the eeployees last name?"
      },
      {
        name: "roleid",
        type: "rawlist",
        message: "What is the employees role?",
        choices: [
          "SR Engineer",
          "Software Engineer",
          "SR Accountant",
          "Accountant"
        ]
      },
    ])
    .then(function(answer) {

      let roleId = answer.roleid;

      if(answer.roleid === "SR Engineer"){
        roleId = 1;
      }else if(answer.roleid === "Software Engineer"){
        roleId = 2;
      }else if(answer.roleid === "SR Accountant"){
        roleId = 3;
      }else if(answer.roleid === "Accountant"){
        roleId = 4;
      }
      // when finished prompting, insert a new item into the db with that info
      connection.query(

        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleId
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}

// function to handle posting new Employee
function addRole() {

  // prompt for info about the new employee
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?"
      },
      {
        name: "deptid",
        type: "input",
        message: "What is the new department ID?",
      },
    ])
    .then(function(answer) {

      let roleId = answer.roleid;

      if(answer.roleid === "SR Engineer"){
        roleId = 1;
      }else if(answer.roleid === "Software Engineer"){
        roleId = 2;
      }else if(answer.roleid === "SR Accountant"){
        roleId = 3;
      }else if(answer.roleid === "Accountant"){
        roleId = 4;
      }
      // when finished prompting, insert a new item into the db with that info
      connection.query(

        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptid
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}
