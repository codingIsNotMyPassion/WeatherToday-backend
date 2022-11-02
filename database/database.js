const mongoose = require("mongoose")

const db = async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI)
     .then(console.log("mongoDB connected"))
    } catch (error) {
        console.log(error)
    }
}

module.exports = db