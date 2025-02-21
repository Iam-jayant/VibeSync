require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const engine = require('ejs-mate');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"; 
const API_KEY = process.env.HUGGINGFACE_API_KEY;

app.get("/chatbot", (req, res) => {
    res.render("index.ejs");
});

app.get("/vibesync", (req, res) => {
    res.render("chat.ejs");
});

app.post("/chat", async (req, res) => {
    try {
        let { message } = req.body;

        const response = await axios.post(
            API_URL,
            { inputs: message },
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );

        res.send(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

app.listen(8080, () => {
    console.log("Server is listening on http://localhost:8080/chatbot");
});
app.use(express.static('public'));
