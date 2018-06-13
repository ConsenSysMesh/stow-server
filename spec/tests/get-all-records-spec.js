var request = require('request');
var crypto = require("crypto");

describe("GetAllRecords", function() {
  var Record = require('../../models/record');
  var i;
  for (i = 0; i < 22; i++) { 
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: 'Test User',
        metadata: 'property1 testprop prop3'+i,
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, function(err, httpResponse, body){})
  }

  it("should be at least 20 files from Test User with property prop", function(done) {
    request.get({url:'http://localhost:3000/recordsByProperty?owner=Test%20User&property=prop'}, function(err, httpResponse, body){
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it("should be at least 20 files with property prop", function(done) {
    request.get({url:'http://localhost:3000/recordsByProperty?property=prop'}, function(err, httpResponse, body){
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

});