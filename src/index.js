const express = require("express");
const got = require("got");
const app = express();

const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-video")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
  require("metascraper-media-provider")()
]);

// Example URLS
//https://www.instagram.com/p/B6bXR-mpi-T/
//https://www.facebook.com/watch/?v=486498922592560
//https://www.facebook.com/CocaColaUnitedStates/photos/a.855061967859852/4308394145859933
const targetUrl = "https://metascraper.js.org/#/";

app.get("/", (req, res) => {
  (async () => {
    const { body: html, url } = await got(targetUrl);
    const data = await metascraper({ html, url });
    return res.json(data);
  })();
});

app.listen(8080);
