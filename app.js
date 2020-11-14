const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const allEmployees = []

//Initial questions for fist team member (Manager)
inquirer
    .prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber",
        }
    ]
    )
    .then(function(response) {
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        allEmployees.push(newManager);
        nextMember();
    })

// Function to ask Engineer questions
function engineerQuestions() {
    inquirer
        .prompt(
          [
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your engineer's id?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "github",
            }
        ]
        )
        .then(function(response) {
            const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
            allEmployees.push(newEngineer);
            nextMember();
    })
}

// Function to ask Intern questions
function internQuestions() {
    inquirer
        .prompt(
          [
            {
                type: "input",
                message: "What is your intern's name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your intern's id?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "school",
            }
        ]
        )
        .then(function(response) {
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
            allEmployees.push(newIntern);
            nextMember();
    })
}

// Function to prompt multiple choice question about which employee to add next or to finish list
function nextMember() {
    inquirer
        .prompt(
          [
            {
                type: "list",
                message: "Which type of team member would you like to add next?",
                name: "role",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am done adding team members."
                ],
            }
        ]
        )
        .then(function(response) {
            if (response.role === "Engineer") {
              engineerQuestions();
            }
            else if (response.role === "Intern") {
                internQuestions();
            }
            else {
                console.log("Your team is done check Ouput folder for HTML file");
                createHTMLFile(allEmployees);
            }
    })
}

// Function to create the user's generated folder and files
function createUserFile(data) {
    fs.writeFile(outputPath, render(data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
}

// Function to generate the HTML file from the templates
function createHTMLFile(data) {
    if (fs.existsSync(OUTPUT_DIR)) {
        createUserFile(data);
    } else {
        fs.mkdir(OUTPUT_DIR, function(err) {
            if (err) {
                return console.log(err);
            }
        })
    
        createUserFile(data);
    }
}


