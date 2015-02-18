module.exports = function() {
  return function(path, id, verb) {
    var req = {
      'baseUrl': path,
      'body': '',
      'originalUrl': path,
      'params': '',
      'path': '',
      'protocol': '',
      'url': path,
      'method': verb
    };
    return req;
  };
};
