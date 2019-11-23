const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML.js")
const writeToFile = util.promisify(fs.writeFile)
const puppeteer = require("puppeteer")
const open = require("open")


// questions for user when run in node
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
        // gets github username from above and makes an API call to github and then generates HTML file based on parameters
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
        // uses puppeteer to create PDF from the HTML file
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const htmlDoc = fs.readFileSync("./Portfolio.html", "utf8");

        await page.setContent(htmlDoc);

        await page.pdf({
            path: 'portfolio.pdf'
        });

        await browser.close();

        // opens the PDF file
      }).then (async () => {
        await open("./portfolio.pdf")

      })

    .catch( (err) => console.log(err))
  