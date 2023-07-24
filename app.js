const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const chat = express();

chat.use(bodyParser.urlencoded({ extended: false }));

chat.get("/", (req, res) => {
  fs.readFile("username.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat Exist";
    }
    res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value= localStorage.getItem('username')">
        <input type="text" name="message" id="message">
        <input type="hidden" name="username" id="username">
        <br />
        <button type="submit" >Send</button>
        </form>`);
  });
});

chat.post("/", (req, res, next) => {
  console.log(req.body.username);
  console.log(req.body.message);
  fs.writeFile(
    "username.txt",
    `${req.body.username}: ${req.body.message}`,
    { flag: "a" },
    (err) => {
      err ? console.log(err) : res.redirect("/");
    }
  );
});

chat.get("/login", (req, res, next) => {
  res.send(
    `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
            <input id="username" type="text" name"title">
            <button type="submit">login</button>
        </form>`
  );
});

chat.listen(4300);
