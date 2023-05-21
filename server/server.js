const express = require("express");
const cors = require("cors");

const ip = require("ip-address");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    try {
        let param = req.query.param;
        let search = "&ipAddress=";
        
        const apiKey = process.env.API_KEY;

        if(!(ip.Address4.isValid(param) || ip.Address6.isValid(param))) {
            search = "&domain=";
        }

        axios.get("https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + search + param)
          .then(response => {
            res.send(response.data);
          })
          .catch(error => {
            console.error(error);
            res.status(400).json({message: error.message});
          });
    } catch (error) {
      console.error(error);
      res.status(500).send('{"500":"Internal Server Error"}');
    }
  });

  app.listen(5050, () => {
    console.log('Server working on port: 5050');
  });