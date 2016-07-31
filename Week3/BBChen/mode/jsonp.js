function jsonp(app) {
  app.get('/getJSONPResponse.do', function(req, res) {
    var callBack = req.query && req.query.callBack || '',
      resContent = {data: "BBChen"},
      ret;

    ret = callBack+'('+JSON.stringify(resContent)+')';

    res.end(ret);

  })
}

module.exports = jsonp;