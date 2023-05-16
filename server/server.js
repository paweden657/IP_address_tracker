const express = require("express");
const cors = require("cors");

const ip = require("ip-address");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    try {
        let IpAddress = req.query.param;
        if(ip.Address4.isValid(IpAddress) || ip.Address6.isValid(IpAddress)) {
          const apiKey = process.env.API_KEY;
          axios.get("https://geo.ipify.org/api/v2/country?apiKey=" + apiKey + "&ipAddress=" + IpAddress)
          .then(response => {
            res.send(response.data);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('{"500":"Internal Server Error"}');
          });
        } else {
          res.status(400).send('{"400":"Bad Request"}');
        }
    } catch (error) {
      console.error(error);
      res.status(500).send('{"500":"Internal Server Error"}');
    }
  });

  app.listen(5050, () => {
    console.log('Server working on port: 5050');
  });