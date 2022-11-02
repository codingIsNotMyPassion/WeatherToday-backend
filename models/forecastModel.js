const mongoose = require("mongoose")

const forecastSchema = mongoose.Schema({
    Town: String,
    Morning: String,
    Dusk: String,
    MoonLit: String,
    MoonSleep: String,
    Orientation: String,
    Illumination: Number
})

module.exports = mongoose.model("forecastModel", forecastSchema)