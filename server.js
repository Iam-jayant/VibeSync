const express = require("express");
const axios = require("axios"); // Use require instead of import
const path = require("path");
const engine = require('ejs-mate');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', engine);

app.get("/vibesync", (req, res) => {
    res.render("index.ejs");
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
