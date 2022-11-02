const forecastModel = require("../models/forecastModel");
const axios = require("axios");
let data, name;
const getdata = async (x) => {
  try {
    await axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.APIKEY}&q=${x}&days=1&aqi=no&alerts=no`
      )
      .then((response) => {
        name = response.data.location.name
        data = response.data.forecast.forecastday[0].astro;
        return data,name;
      });
  } catch (error) {
    console.log(error);
  }
};

const forecastApi = async (req, res) => {
  try {
    const loc = req.params.loc;
    await getdata(loc);
    const {
      sunrise,
      sunset,
      moonrise,
      moonset,
      moon_phase,
      moon_illumination,
    } = data;
    const forecast = await forecastModel.find({ town: name }).count();
    const forecastData = {
      Town: name,
      Morning: sunrise,
      Dusk: sunset,
      MoonLit: moonrise,
      MoonSleep: moonset,
      Orientation: moon_phase,
      Illumination: moon_illumination,
    };
    if (forecast > 0) {
      const updated = await forecastModel.updateOne({ town: name },forecastData);
      if (updated.acknowledged) {
        res.status(200).json(forecastData);
      }
    } else {
      forecastModel.create(forecastData);
      res.status(200).json(forecastData);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = forecastApi;