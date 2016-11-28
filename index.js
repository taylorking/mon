var AlexaSkill = require('./AlexaSkill.js');
var APP_ID = 'dont put this in version control';
var Monero = require('./Monero.js');

var Mon = function() {
      AlexaSkill.call(this, APP_ID); 
}
Mon.prototype = Object.create(AlexaSkill.prototype);
Mon.prototype.constructor = Mon;


Mon.prototype.intentHandlers = { 
      "GetMoneroPrice": function (intent, session, response) {
          Monero.getString().then(function(str) { 
             response.tell("The price of monero is: " + str)
           });
      }
}

exports.handler = function (event, context) {
      var app = new Mon();
            app.execute(event, context);
}


