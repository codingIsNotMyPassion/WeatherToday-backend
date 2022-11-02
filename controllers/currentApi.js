const currentModel = require("../models/currentModel");
const axios = require("axios");
let data;
const getdata = async (x) => {
  try {
    await axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.APIKEY}&q=${x}&aqi=no`
      )
      .then((response) => {
        data = response.data.location;
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const currentApi = async (req, res) => {
  try {
    const loc = req.params.loc;
    await getdata(loc);
    const { name, region, country, lat, lon, tz_id, localtime } = data;
    const current = await currentModel.find({ town: name }).count();
    const currentData = {
      Town: name,
      State: region,
      Nation: country,
      Latitude: lat,
      Longitude: lon,
      TimeZone: tz_id,
      Time: localtime,
    };
    if (current > 0) {
      const updated = await currentModel.updateOne({ town: name }, currentData);
      if(updated.acknowledged){
        res.status(200).json(currentData);
      }
    } else {
      currentModel.create(currentData);
      res.status(200).json(currentData);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = currentApi;
