require('dotenv').config();
const request = require('request');
const crypto = require("crypto");
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');
const port = process.env.LINNIA_PORT;

describe("GetAllRecords", () => {
  beforeEach(cleanDatabase);

  beforeEach(async (done) => {
    const { Record } = require('../../models');

    for (let i = 0; i < 20; i++) {
      await Record.create({
        owner: mocks.userOne.address,
        metadata: 'ACTIVITIES',
        dataHash: crypto.randomBytes(32).toString('hex'),
        dataUri: mocks.recordOne.dataUri
      });
    }

    done();
  });

  afterEach(cleanDatabase);

  it("should be at least 2 files from Test User with property ACTIVITIES", (done) => {
    request.get({url:`http://localhost:${port}/records?owner=${mocks.userOne.address}&property=ACTIVITIES`}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it("should be at least 2 files with ACTIVITIES prop", (done) => {
    request.get({url:`http://localhost:${port}/records?property=ACTIVITIES`}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

  it(`should be at least 2 files from ${mocks.userOne.address}`, (done) => {
    request.get({url:`http://localhost:${port}/records?owner=${mocks.userOne.address}`}, (err, httpResponse, body) => {
      const obj = JSON.parse(body)
      const count = Object.keys(obj).length
      expect(count).toBeGreaterThan(19)
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })
  });

});
