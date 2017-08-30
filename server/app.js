const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const auth = require('http-auth');
const config = require('./services/config');

const STATIC_OPTIONS = { maxAge: 3600000 };
const port = process.env.PORT || config.server.port || 80;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const basic = auth.basic({
    realm: "EDhjohO372H",
    file:  path.join(__dirname, '../', config.server.htaccessFilePath)
});
 
app.use(auth.connect(basic));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/torrent', require('./api/torrent'))
  .use(express.static(path.join(__dirname, '../client/build'), STATIC_OPTIONS));

app.listen(port, () => {
  console.log('We are live on ' + port);
});


