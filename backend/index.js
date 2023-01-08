const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");


app.use(cors());
app.use(express.json());

app.use("/orders",require("./routes/orders"));
app.get("/", (req, res) => {
    res.status(200).json({ "message": "Hey I am pizza website backend" });
})

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongodb_url, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Local Database Connected.");
    }
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started at ${process.env.PORT || 5000}`)
})