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

const API_URL = "https://api.together.xyz/v1/chat/completions"; 
const API_KEY = process.env.TOGETHER_API_KEY;

app.get("/", (req, res) => {
    res.redirect("/chatbot"); // Redirects "/" to "/chatbot"
});

app.get("/chatbot", (req, res) => {
    res.render("index.ejs");
});

app.get("/vibesync", (req, res) => {
    res.render("chat.ejs");
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://api.together.xyz/v1/chat/completions",
            {
                model: "mistralai/Mistral-7B-Instruct-v0.1", // Ensure correct model name
                messages: [{ role: "user", content: message }],
                temperature: 0.7
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        // Extract the correct response format
        const botResponse = response.data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
        
        // Send in correct JSON format
        res.json({ choices: [{ message: { content: botResponse } }] });
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

app.listen(8080, () => {
    console.log("Server is listening on http://localhost:8080/chatbot");
});
app.use(express.static('public'));
