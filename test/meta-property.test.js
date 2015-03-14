var should = require('should');
var propertyFactory = require('../meta-data/meta-property');

describe('property access', function() {
  describe('Get the name of the property', function() {
    it('should be able to find the name of a property', function() {
      var sut = propertyFactory({name: 'test'});
      sut.getName().should.be.exactly('test');
    });
    it('should throw an error if name doesn\'t exist', function() {
      try {
        propertyFactory({namex: 'test'});
        fail('expected exception not thrown');
      } catch(e) {
        e.should.be.instanceOf(Error);
        e.message.should.be.exactly('name property must be present for property');
      }
    });
  });
  describe('Get the flags of the property', function() {
    it('should be able to find the visibilty flag for the property', function() {
      var sut = propertyFactory({name: 'test'});
      sut.isVisible().should.be.exactly(true);
      sut = propertyFactory({name: 'test', visible: false});
      sut.isVisible().should.be.exactly(false);
      sut = propertyFactory({name: 'test', visible: true});
      sut.isVisible().should.be.exactly(true);
    });
    it('should be able to find the key flag for the property', function() {
      var sut = propertyFactory({name: 'test'});
      sut.isKey().should.be.exactly(false);
      sut = propertyFactory({name: 'test', key: true});
      sut.isKey().should.be.exactly(true);
      sut = propertyFactory({name: 'test', key: false});
      sut.isKey().should.be.exactly(false);
    });
    it('should be able to find the required flag for the property', function() {
      var sut = propertyFactory({name: 'test'});
      sut.isRequired().should.be.exactly(false);
      sut = propertyFactory({name: 'test', required: true});
      sut.isRequired().should.be.exactly(true);
      sut = propertyFactory({name: 'test', required: false});
      sut.isRequired().should.be.exactly(false);
    });
    it('should be able to find the default value for the property', function() {
      var sut = propertyFactory({name: 'test'});
      should.not.exist(sut.getDefaultValue());
      sut = propertyFactory({name: 'test', deflt: 'd'});
      sut.getDefaultValue().should.be.exactly('d');
    });
  });
  describe('Get the pattern/type of the property', function() {
    it('should be able to find the pattern for the property', function() {
      var sut = propertyFactory({name: 'test'});
      should.not.exist(sut.getPattern());
      sut = propertyFactory({name: 'test', pattern: /./});
      sut.getPattern().should.be.instanceof(Object);
    });
    it('should be able to find the type for the property', function() {
      var sut = propertyFactory({name: 'test'});
      sut.getType().should.be.exactly('string');
      sut = propertyFactory({name: 'test', type: 'date'});
      sut.getType().should.be.exactly('date');
      should.not.exist(sut.getPattern());
      sut = propertyFactory({name: 'test', type: 'email'});
      sut.getType().should.be.exactly('email');
      sut.getPattern().should.be.instanceof(Object);
    });
  });
  describe('Determine if the value is valid for the property', function() {
    it('should be able to determine if an email is valid', function() {
      var sut = propertyFactory({name: 'test', type: 'email'});
      sut.isValid('randysr@kamradtfamily.net').should.be.exactly(true);
      sut.isValid('randysr#kamradtfamily.net').should.be.exactly(false);
    });
    it('should be able to determine if value matches pattern', function() {
      var sut = propertyFactory({name: 'test', pattern: /^[0-9]$/});
      sut.isValid('1').should.be.exactly(true);
      sut.isValid('a').should.be.exactly(false);
    });
  });
});
