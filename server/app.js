require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("server start")
})
app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});