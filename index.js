const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML.js")
const writeToFile = util.promisify(fs.writeFile)
const puppeteer = require("puppeteer")


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
    
        const getUsers = () => {
            const queryURL = `https://api.github.com/users/${username}`;

            axios.get(queryURL)
                .then((answers) => {

                    const html = generateHTML(data, answers)

                    return writeToFile("Portfolio.html", html)
                })

        }
        getUsers()

    }).then(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const htmlDoc = fs.readFileSync("./Portfolio.html", "utf8");

        await page.setContent(htmlDoc);

        await page.pdf({
            path: 'portfolio.pdf'
        });

        // await browser.close();
    })

    .catch( (err) => console.log(err))
  