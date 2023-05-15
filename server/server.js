const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    try {
        let IpAddress = req.query.param;
        console.log(IpAddress);
        //const apiKey = process.env.API_KEY;
  
        //const response = await axios.get("https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&ipAddress=" + IpAddress);

        //const data = response.data;

        res.send('{"Otrzymano_zapytanie":"hello!"}');

    } catch (error) {
      console.error(error);
      res.status(500).send('error occured');
    }
  });
  
  app.listen(5050, () => {
    console.log('Server working on port: 5050');
  });