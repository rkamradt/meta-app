module.exports = function() {
  return function(json) {
    var istring = '';
    var msg = '';
    var res = {
      'app': {},
      'headersSent': false,
      'locals': {},

      'end': function(string) {
          this.istring = string;
      },
      'message': function() {
        return this.istring;
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
        this.msg += msg;
        this.headersSent = true;
      },
      'sendFile': function() {},
      'sendStatus': function() {},
      'set': function() {},
      'status': function() {},
    };
    return res;
  };
};
