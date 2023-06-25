const express= require("express");
const multer  = require('multer')
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser")
const validateToken=require("./helpers/jwt")
dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(multer().array())
app.use(cookieParser())
app.get("/", function(req,res) {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


const userRoute=require("./routes/v1/userRoute")
const locationRoute=require("./routes/v1/locationRoute")
const totalRoute=require("./routes/v1/totalRoute")

app.use("/api/v1/users",userRoute)
app.use("/api/v1/locations",locationRoute)
app.use("/api/v1/total",totalRoute)
