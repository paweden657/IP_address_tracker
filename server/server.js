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
        if(ip.Address6.isValid(IpAddress) || ip.Address4.isValid(IpAddress)) {
          console.log("Ip address is valid");
          //const apiKey = process.env.API_KEY;
  
          //const response = await axios.get("https://geo.ipify.org/api/v2/country,city?apiKey=" + apiKey + "&ipAddress=" + IpAddress);

          //const data = response.data;

          console.log(IpAddress);
          res.send('{"Answer":"Address is valid"}');
        } else {
          console.log("Ip address is not valid");
          console.log(IpAddress);
          res.send('{"Answer":"Adres is not valid"}');
        }

    } catch (error) {
      console.error(error);
      res.status(500).send('error occured');
    }
  });

  app.listen(5050, () => {
    console.log('Server working on port: 5050');
  });