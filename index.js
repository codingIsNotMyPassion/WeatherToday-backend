// create express app
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

// connecting to database
const connectDB = require ("./database/database")
connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// create server
const port = process.env.PORT
app.listen(port,()=>{
console.log(`app listening on ${port}`)
})

app.get("/", (req,res)=>{
res.send(console.log("hello world"))
})

//routes
const router = require("./routes/weatherRoute");
app.use("/weather", router)
app.use("/weather", router)