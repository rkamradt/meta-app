var emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

module.exports = function(json) {
  var ret = {
    'init': function(json) {
      if(!json.name) {
        throw Error('name property must be present for property');
      }
      if(typeof(json.visible) !== 'undefined') {
        this._visible = json.visible;
      } else {
        this._visible = true;
      }
      this._key = json.key || false;
      this._name = json.name;
      this._required = json.required || json.key || false;
      this._pattern = json.pattern;
      this._type = json.type || 'string';
      this._default = json.deflt;
      if(!this._pattern) {
        if(this._type === 'email') {
          this._pattern = emailPattern;
        }
      } else {
        if(typeof(this._pattern.test) !== 'function') {
          throw Error('pattern must be regex');
        }
      }
      if(this._pattern && this._default && !this._pattern.test(this._default)) {
          throw Error('default ' + this._default + ' must match pattern ' + this._pattern);
      }
    },
    'isVisible': function() {
      return this._visible;
    },
    'isKey': function() {
      return this._key;
    },
    'getName': function() {
      return this._name;
    },
    'getDefaultValue': function() {
      return this._default;
    },
    'getType': function() {
      return this._type;
    },
    'isRequired': function() {
      return this._required;
    },
    'getPattern': function() {
      if(!this._pattern && this._type) {
        if(this._type) {
        }
      }
      return this._pattern;
    },
    'isValid': function(obj) {
      if(!obj) {
        return this.isRequired();
      }
      if(this.getPattern()) {
        return this.getPattern().test(obj);
      }
      return true;
    }
  };
  ret.init(json);
  return ret;
};
