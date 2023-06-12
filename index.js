const express= require("express");
const multer  = require('multer')
const app = express();
var bodyParser = require('body-parser')

const dotenv=require("dotenv");
dotenv.config();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(multer().array())
app.get("/", function(req,res) {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


const userRoute=require("./routes/v1/userRoute")
app.use("/api/v1/total",userRoute)
const locationRoute=require("./routes/v1/locationRoute")
app.use("/api/v1/location",locationRoute)