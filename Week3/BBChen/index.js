var express = require("express");
var port = process.env.PORT || 1111;

var app = express();
require('./mode/cors.js')(app);
require('./mode/jsonp.js')(app);

app.use(express.static(__dirname+'/public'));

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("server is start...");
    }
})