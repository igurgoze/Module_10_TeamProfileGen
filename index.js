const inquirer = require ('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const roleSelector = [
    {message: 'Choose an employee role or Exit.',
        type: 'list',
        choices: [
            'Engineer',
            'Intern',
            'Exit'
    ],
        name: 'employeeMenu'
    }]

const managerQ = [
    {
        message: ` Manager Name: `,
        type: `input`,
        name: 'managerName'},
    {
        message: `Manager ID: `,
        type: 'input',
        name: 'managerID'
        },
    {
        message: `Manager Email: `,
        type: 'input',
        name: 'managerEmail'
    },
    {
        message: `Office Number: `,
        type: `input`,
        name: `managerOffice`

    }]
const engineerQ =[
    {
        message: `Engineer Name: `,
        type: `input`,
        name: `engineerName`,
    },
    {
        message: `Engineer ID: `,
        type: `input`,
        name: `engineerID`,
    },
    {
        message: `Engineer Email:`,
        type: `input`,
        name: `engineerEmail`
    },
    {
        message: `Engineer GitHub: `,
        input: `input`,
        name: `engineerGithub`
    }
]
const internQ =[
    {
        message: `Intern Name: `,
        type: `input`,
        name: `internName`,
    },
    {
        message: `Intern ID: `,
        type: `input`,
        name: `internID`,
    },
    {
        message: `Intern Email: `,
        type: `input`,
        name: `internEmail`
    },
    {
        message: `Intern School: `,
        input: `input`,
        name: `internSchool`
    }
]

const employeeArr = [];
const htmlArr = [];

function init() {
    inquirer.prompt(managerQ)
    .then(answer => {
        new Manager(answer)
        managerCard(answer)
        employeeInit()
        })
        .catch(error => {
            if(error){throw error}
        })}

function employeeInit () {
    inquirer.prompt(roleSelector)
    .then(answer => {initialMenu(answer)})
    .catch(console.error)}

function managerCard(Manager) {
    const managerCard = [
    `<div class="card m-3 bg-info" style="width: 18rem;">
    <div div class="card-header">
        ${Manager.managerName}
    </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${Manager.managerID}</li>
            <li class="list-group-item">Email: <a href="mailto:${Manager.managerEmail}">${Manager.managerEmail}</a></li>
            <li class="list-group-item">Office#: ${Manager.managerOffice}</li>
        </ul>
    </div>`
    ]
    htmlArr.push(managerCard)
}

function initialMenu(answer){
    switch (answer.employeeMenu) {
        case 'Engineer':
            createEngineer();
        break;
        case 'Intern':
            createIntern();
        break;
        default:
            generateHTML()}
    }

    function createEngineer() {
    inquirer.prompt(engineerQ)
    .then(answer => {
    new Engineer(answer)
    employeeArr.push(answer)
    engineerCard(answer)
    console.info(employeeArr)
    employeeInit()
    })
    .catch(console.error)}
    
    function engineerCard(Engineer) {
    const engineerCard = [
    `
    <div class="card m-3 bg-info" style="width: 18rem;">
    <div div class="card-header">
    ${Engineer.engineerName}
    </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${Engineer.engineerID}</li>
            <li class="list-group-item">Email: <a href="mailto:${Engineer.engineerEmail}">${Engineer.engineerEmail}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${Engineer.engineerGithub}" target="_blank">${Engineer.engineerGithub}</a></li>
        </ul>
    </div>`
]
    htmlArr.push(engineerCard)
}


    function createIntern() {
        inquirer.prompt(internQ)
        .then(answer => {
        new Intern(answer)
    employeeArr.push(answer)
    internCard(answer)
    console.info(employeeArr)
    employeeInit()
    }).catch(console.error)}

    function internCard(Intern) {
        const internCard = [
    `<div class="card m-3 bg-info" style="width: 18rem;">
    <div div class="card-header">
        ${Intern.internName}
    </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${Intern.internID}</li>
            <li class="list-group-item">Email: <a href="mail to:${Intern.internEmail}">${Intern.internEmail}</a></li>
            <li class="list-group-item">School: ${Intern.internSchool}</li>
        </ul>
    </div>`
        ]
        htmlArr.push(internCard)
    }
    
function generateHTML () {
        const titleHTML = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    </head>
    <body>
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg bg-success">
        <div class="container-fluid">
            <a class="navbar-brand">My Team!</a>
        </div>
            </nav>
        </div>
        <div class="container row">`

    let cardHTML = ``;
    
    for (let i = 0; i < htmlArr.length; i++) {
        cardHTML = cardHTML.concat(htmlArr[i]);}
        const finalHTML = titleHTML.concat(cardHTML)
        writeHTML(finalHTML)
    }
function writeHTML(finalHTML) {
    fs.writeFileSync('index.HTML', finalHTML, (err) => {
        if (err) {throw err;}})
        process.exit()
    }
    init();