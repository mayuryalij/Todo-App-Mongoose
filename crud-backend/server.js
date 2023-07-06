const express = require("express");
const cors = require("cors");
const app = express();
import mongoose from "mongoose";
import './routes/contactList';

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
let db;

let connectionString = process.env.connectionString;

app.use(cors());
app.use(express.json());


// mongoose.connect("mongodb://localhost:27017/mongoose");



mongoose.connect(
  connectionString,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Connection failed for some reason");
    }
    console.log("Connection established - All well");
    db = client.db("crud");
    app.listen(PORT, function () {
      console.log("Server is running on Port: " + PORT);
    });
  }
);
