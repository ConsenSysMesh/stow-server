const request = require('request');
const crypto = require("crypto");
const mocks = require('./../mocks');

describe("GetAllRecords", () => {
  beforeEach(async (done) => {
    const { Record, User } = require('../../models');
    const records = [];

    const user = await User.findOrCreate({ where: mocks.userOne });

    for (let i = 0; i < 20; i++) {
      records.push({
        owner: mocks.userOne.address,
        metadata: 'ACTIVITIES',
        dataHash: crypto.randomBytes(32).toString('hex'),
        dataUri: mocks.recordOne.dataUri
      });
    }

    await Promise.all([records.map(record => Record.findOrCreate({
      where: record
    }))]);

    done();
  });

  it("should be at least 2 files from Test User with property ACTIVITIES", (done) => {
    request.get({url:`http://localhost:3000/records?owner=${mocks.userOne.address}&property=ACTIVITIES`}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it("should be at least 2 files with ACTIVITIES prop", (done) => {
    request.get({url:'http://localhost:3000/records?property=ACTIVITIES'}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it(`should be at least 2 files from ${mocks.userOne.address}`, (done) => {
    request.get({url:`http://localhost:3000/records?owner=${mocks.userOne.address}`}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

});
