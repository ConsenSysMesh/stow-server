var request = require('request');
var crypto = require("crypto");

var dataHash = crypto.randomBytes(32).toString('hex')

describe("CreateRecord", function() {
  var Record = require('../../models/record');

  it("should create a record and return 200", function(done) {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta',
        dataHash: dataHash
      }
    }, function(err, httpResponse, body){
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })

  });

  it("should return 400, dataHash must be unique", function(done) {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta',
        dataHash: dataHash
      }
    }, function(err, httpResponse, body){
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('dataHash must be unique')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing owner", function(done) {
    request.post({url:'http://localhost:3000/records', 
      form: {
        metadata: 'meta',
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, function(err, httpResponse, body){
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.owner cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing metadata", function(done) {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, function(err, httpResponse, body){
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.metadata cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing dataHash", function(done) {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta'
      }
    }, function(err, httpResponse, body){
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.dataHash cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

});