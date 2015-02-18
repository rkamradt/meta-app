 module.exports = function() {
  return function() {
    var res = {
      'app': {},
      'headersSent': false,
      'rstatus': 200,
      'rmessage': '',
      'locals': {},

      'end': function(string) {
          this.rmessage += string;
      },
      'message': function() {
        return this.rmessage;
      },
      'append': function() {},
      'attachment': function() {},
      'cookie': function() {},
      'clearCookie': function() {},
      'download': function() {},
      'format': function() {},
      'get': function() {},
      'json': function() {},
      'jsonp': function() {},
      'links': function() {},
      'location': function() {},
      'redirect': function() {},
      'render': function() {},
      'send': function(msg) {
        this.rmessage += msg;
        this.headersSent = true;
        return this;
      },
      'sendFile': function() {},
      'sendStatus': function() {},
      'set': function() {},
      'status': function(status) {
        this.rstatus = status;
        return this;
      },
    };
    return res;
  };
};
