require("dotenv").config()
var express = require( "express");
var bodyParser = require("body-parser")
var cors = require("cors")
var app = express();
var router = require("./application/router")
var morgan = require("morgan")
var path = require("path")

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"))

app.use(router);
app.use("/static", express.static(path.join(__dirname, "static")));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))