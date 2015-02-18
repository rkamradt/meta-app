 module.exports = function() {
  return function() {
    var res = {
      'rstatus': 200,
      'rmessage': '',
      'message': function() {
        return this.rmessage;
      },
      'send': function(msg) {
        this.rmessage += msg;
        return this;
      },
      'status': function(status) {
        this.rstatus = status;
        return this;
      },
    };
    return res;
  };
};
