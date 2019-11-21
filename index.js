const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML.js")
const convertHTMLToPDF = require("pdf-puppeteer");

// var callback = function (pdf) {
//     res.setHeader("Content-Type", "application/pdf");
//     res.send(pdf);
// }


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
        let username = data.username;
        let colors = data.colors;
        let location = data.location;

        const getUsers = () => {
            const queryURL = `https://api.github.com/users/${username}`;

            axios.get(queryURL)
                .then((answers) => {
                    // console.log("answers" + answers.data)
                    console.log("in axios data" + data);
                    console.log(queryURL)
                    console.log(answers.data.id)
                    console.log("answers" + answers.data)
                    dataJSONString= JSON.stringify(data)
                    console.log("JSON" + dataJSONString)
                    
                    const html = generateHTML(data, answers)
                    console.log("html" + html)
                    return writeToFile("Portfolio.html", html)
                })

        }
        getUsers()
    })
    // .then((data, answers) => {
        

    //     // ;
    // }) 

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


                // .then(() => {



                // })
        //         // .then(() => {
        //         //     convertHTMLToPDF("Portfolio.pdf", callback)
        //         // })
        //         .catch( (err) => console.log(err))



// console.log("outside", answers)

        // console.log("question" + data)




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

// module.exports = {
//     answers: answers,
//     data: data
//   };
