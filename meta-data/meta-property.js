/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * Meta-data property definition.
 * @module meta-data/meta-property
 */
var emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
/**
 * factory for creating a property defintion object from json
 *
 * @param  {Object} json The parsed JSON from the data definition file
 * @return {Object}      An API Object
 */
module.exports = function(json) {
  var ret = {
    /**
     * precomputes some values during construction
     * enforces that the name property is present and the
     * the pattern property has a function called 'test' (is a regex)
     * It also provides defaults for visible (true), key (false),
     * required (false if key is false), and type (string)
     * If the type is email, it set the pattern to a common email
     * regex, and also checks if there is a default value and
     * a pattern that the default value matches the pattern.
     *
     * @param  {Object} json The parsed JSON from the data definition file
     */
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
    /**
     * Returns the visible flag
     * @return {boolean} True if the property should be available across services
     */
    'isVisible': function() {
      return this._visible;
    },
    /**
     * Returns the key flag
     * @return {boolean} True if the property is the main (unique) key
     */
    'isKey': function() {
      return this._key;
    },
    /**
     * Returns the name of the property
     * @return {string} The name of the property
     */
    'getName': function() {
      return this._name;
    },
    /**
     * Return the default value
     * @return {string} The default value
     */
    'getDefaultValue': function() {
      return this._default;
    },
    /**
     * get the type (currently only 'email' is recognized)
     * This can be used to choose a default pattern, and
     * can also be used on the front-end to influence
     * field construction
     * @return {type} The type
     */
    'getType': function() {
      return this._type;
    },
    /**
     * get the required flag
     * @return {boolean} True if the field is required
     */
    'isRequired': function() {
      return this._required;
    },
    /**
     * get the regex pattern for this property
     * @return {RegEx} The regex pattern for this property
     */
    'getPattern': function() {
      return this._pattern;
    },
    /**
     * check this property for validity
     * @param  {Object} obj the value to check
     * @return {boolean}    True if valid
     */
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
