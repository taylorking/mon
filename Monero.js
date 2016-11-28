const Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);

function getPrice() {
  return request("https://www.cryptocompare.com/api/data/histohour/?aggregate=2&e=CCCAGG&fsym=XMR&limit=218&tsym=USD")
  .then (function (data, err, resp) {
     var Data = JSON.parse(data.body).Data;
     return Data;
  });
}
module.exports.getString = function() {
  return getPrice().then(function(data) {
    var status = (data[data.length - 1].open > data[data.length - 2].open)? 'up' : 'down';
    var d = data[data.length - 1].open; 
    var dollars = d.toString().split('.')[0];
    var cents = d.toString().split('.')[1];
    return dollars + " dollars and " + cents + " cents. " + status + "from the price of" + "2 hours ago";
  })
}
