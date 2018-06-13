var request = require('request');
var crypto = require("crypto");

var dataHash = crypto.randomBytes(32).toString('hex')

describe("GetRecordsByProperty", function() {
  var Record = require('../../models/record');
  var i;
  for (i = 0; i < 22; i++) { 
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: 'John Doe',
        metadata: 'Metadata '+i,
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, function(err, httpResponse, body){})
  }

  it("should be at least 20 files", function(done) {
    request.get({url:'http://localhost:3000/records'}, function(err, httpResponse, body){
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it("should be at least 20 files from John Doe", function(done) {
    request.get({url:'http://localhost:3000/recordsByOwner?owner=John%20Doe'}, function(err, httpResponse, body){
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

});