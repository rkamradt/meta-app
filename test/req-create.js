module.exports = function() {
  return function(path, id, verb) {
    var req = {
      'app': {},
      'baseUrl': path,
      'body': '',
      'cookies': '',
      'fresh': '',
      'hostname': '',
      'ip': '',
      'ips': '',
      'originalUrl': path,
      'params': '',
      'path': '',
      'protocol': '',
      'query': '',
      'route': '',
      'secure': false,
      'signedCookies': '',
      'stale': false,
      'subdomains': '',
      'xhr': '',
      'url': path,
      'verb': verb
    };
    console.log("req.url: " + req.url);
    return req;
  };
};
