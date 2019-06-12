var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/CSS", express.static(__dirname));
app.use("/Images", express.static(__dirname));
app.use("/JS", express.static(__dirname));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/greg_giordano_project.html'));
});

app.listen(process.env.PORT || 8080);