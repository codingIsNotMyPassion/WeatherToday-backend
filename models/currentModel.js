const mongoose = require("mongoose")

const currentSchema = mongoose.Schema({
    Town:String,
    State:String,
    Nation:String,
    Latitude:Number,
    Longitude:Number,
    TimeZone: String,
    Time:Date
})

module.exports = mongoose.model("currentModel", currentSchema)