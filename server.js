const express = require("express");
const axios = require("axios");
const path = require("path");
const engine = require('ejs-mate');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', engine);

app.get("/chatbot", (req, res) => {
    res.render("index.ejs");
});

app.get("/videsync", (req, res) => {
    res.render("chat.ejs");
});

app.get("/chat", async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(8080, () => {
    console.log("Server is listening on http://localhost:8080/chatbot");
});
