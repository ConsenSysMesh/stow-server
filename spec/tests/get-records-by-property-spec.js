var request = require('request');
var crypto = require("crypto");

var dataHash = crypto.randomBytes(32).toString('hex')

describe("GetRecordsByProperty", () => {
  var i;
  for (i = 0; i < 22; i++) { 
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: 'John Doe',
        metadata: 'Metadata '+i,
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, (err, httpResponse, body) => {})
  }

  it("should be at least 20 files", (done) => {
    request.get({url:'http://localhost:3000/records'}, (err, httpResponse, body)=> {
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it("should be at least 20 files from John Doe", (done) => {
    request.get({url:'http://localhost:3000/records?owner=John%20Doe'}, (err, httpResponse, body) => {
      obj = JSON.parse(body)
      count = Object.keys(obj).length
      expect(count).toBeGreaterThan(20)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

});