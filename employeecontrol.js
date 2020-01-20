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
          "View Roles",
          "Add Role",
          "View Departments",
          "Add Department",
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

          case "View Roles":
          viewRoles();
          break;
  
        case "Add Role":
          addRole();
          break;

        case "View Departments":
          viewDept();
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
          // re-prompt the user for what they would like to do.
          runSearch();
        }
      );
    });
};

// function to view all Roles
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, result) {
      if (err) throw err;

      console.table("", result);
  });
  runSearch();
};

// function to handle posting new Role
function addRole() {

  // prompt for info about the new Role
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
        message: "What is the new department ID Must be a number greater than 4?",
      },
    ])
    .then(function(answer) {

      // let query = "SELECT * role.department_id WHERE  ?"
      // if(answer.deptid === connection.query(query, department_id)) {
      //   console.log("Department ID already exists");
      // }else{
      // when finished prompting, insert a new item into the db with that info
      connection.query(

        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: deptId
        },
        function(err) {
          if (err) throw err;
          console.log("Your new role was created successfully!");
          // re-prompt the user for if they want would like to do
          runSearch();
        }
      );
    });
};
// function to view departments
function viewDept() {
  connection.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;

      console.table("", result);
  });
  runSearch();
}

// function to handle adding a new department
function addDept() {

  // prompt for info about the new department
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the new departments name?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(

        "INSERT INTO department SET ?",
        {
          department_name: answer.department,
        },
        function(err) {
          if (err) throw err;
          console.log("Your new department was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}

// function to handle posting new Employee
function upRole() {

  // prompt for info about the new employee
  inquirer
    .prompt([
      {
        name: "roleid",
        type: "rawlist",
        message: "What is the employees new role?",
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
          // re-prompt the user for what they would like to do.
          runSearch();
        }
      );
    });
}

function exit(){
  process.exit()
};