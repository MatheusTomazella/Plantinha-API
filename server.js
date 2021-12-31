"use strict";
exports.__esModule = true;
require('dotenv').config();
var app_1 = require("./src/app");
var http = require('http').Server(app_1["default"].app);
http.listen(process.env.PORT || 3305, function (error) {
    if (error)
        throw error;
    console.log('Server Started');
});
