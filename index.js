const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML.js")

const writeToFile = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer

        .prompt([
            {
                type: "input",
                name: "username",
                message: "What is your github username?"
            },
            {
                type: "input",
                name: "location",
                message: "Where do you live?"
            },
            {
                type: "list",
                name: "color",
                message: "Pick a color?",
                choices: ['green', 'blue', 'pink', 'red']
            },
        ])
};


promptUser()
    .then(data => {
        let username = data.username
        const getUsers = () => {
            const queryURL = `https://api.github.com/users/${username}`;
            const gitData = JSON.stringify(data);
            console.log("git" + gitData)
            console.log("URL" + queryURL);
            
            axios.get(queryURL)
            .then((answers) => {
                
                console.log(answers.data)
                // profile pic id=  profilePic
                // name is id= profileName
                // company is id= company
                // city is id= city
                // github is id= gitHub
                // blog is id= blog


                // public repo id= publicRepo
                // followers id= followers
                // github stars id= gitStars
                // following id= following
            })

        }
        getUsers(username)
       
        });
    
    



// promptUser()
//     .then((data) => {
//         const html = generateHTML(data)
//         return writeToFile("Portfolio.PDF", html);
//     })
//     .then(() => {
//         generateHTML(data) 
//     })
//     .catch( (err) => console.log(err))



// function init() {

// };

// init();
