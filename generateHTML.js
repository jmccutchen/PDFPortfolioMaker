

// color palette for HTML file based on user preference from prompts

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};



function generateHTML(data, answers) {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         .text-center{
          text-align: center;
          }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
      </head>

<body>

    <div class="container">
        <main>
            <div class="wrapper">
                <div class="photo-header">
                    <img id="profilePic" src="${answers.data.avatar_url}">
                    <h1>Hi!</h1>
                    <h2 id="profileName">My name is ${answers.data.name}</h2>
                    <h3 id="company">Currently @ ${answers.data.company} </h3>
                    <div class="row links-nav ">
                        <h4 id="city" class="col nav-link">
                        <i class="fas fa-map-marker-alt"></i>
                        <a href="https://maps.google.com/?q=${data.location}" target="_blank">${data.location}</a>
                        </h4>
                        <h4 id="gitHub" class="col nav-link">
                        <i class="fab fa-github"></i>
                        <a href="${answers.data.html_url}" target="_blank">GitHub</a>
                        </h4>
                        <h4 id="blog" class="col nav-link">
                        <i class="fas fa-blog"></i>
                        <a href="${answers.data.blog}" target="_blank">Blog</a>
                        </h4>
                    </div>
                </div>
            </div>

            <br>
            <br>
            <br>
            <h3 class="text-center">I build things and teach people to code</h3>

            <div class="row">
                <h4 id="publicRepo" class="card col">Public Repositories <br> ${answers.data.public_repos}</h4>
                <h4 id="followers" class="card col">Followers <br> ${answers.data.followers}</h4>
            </div>
            <div class="row">
                <h4 id="gitStars" class="card col">GitHub Stars <br> ${answers.data.public_gists}</h4>
                <h4 id="following" class="card col">Following <br> ${answers.data.following}</h4>
            </div>
            <div class="wrapper"></div>
        </main>
        
    </div>


</body>`
}



module.exports = generateHTML;