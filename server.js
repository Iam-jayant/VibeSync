const express = require("express");
const axios = require("axios"); // Use require instead of import

const app = express();

app.get("/vibesync", (req, res) => {
    res.send("Welcome to VibeSync");
});

app.get("/chat", async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.json(response.data); // Send data as response
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: "Failed to fetch data" }); // Send error response
    }
});

app.listen(8080, () => {
    console.log("Server is listening on http://localhost:8080/vibesync");
});
