function CORS(app) {
  app.post('/getResponse.do', function(req, res){
    //console.log(req);
    res.append("Access-Control-Allow-Origin", "*");
    res.end('{"data": "Successful!"}');
  })
}

module.exports = CORS;