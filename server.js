var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use('/CSS', express.static(__dirname + '/CSS'));
app.use('/Images', express.static(__dirname + '/Images'));
app.use('/JS', express.static(__dirname + '/JS'));

//app.use("/styles", express.static(__dirname + '/CSS'));
//app.use("/images", express.static(__dirname + '/Images'));
//app.use("/scripts", express.static(__dirname + '/JS'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/greg_giordano_project.html'));
});

app.listen(process.env.PORT || 8080);