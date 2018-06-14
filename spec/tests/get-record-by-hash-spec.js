const request = require('request');
const crypto = require("crypto");
const mocks = require('./../mocks');

describe("GetRecord", () => {
  beforeEach(async (done) => {
    const { Record, User } = require('../../models');

    const record = await Record.findOrCreate({
      where: {
        dataHash: mocks.recordOne.dataHash,
        metadata: mocks.recordOne.metadata,
        dataUri: mocks.recordOne.dataUri,
        owner: mocks.userOne.address
      }
    });

    done();
  });

  it('should return the record with the data hash', (done) => {
    request.get({url:`http://localhost:3000/records/${mocks.recordOne.dataHash}`}, (err, httpResponse, body) => {
      const record = JSON.parse(body);
      expect(record.dataHash).toEqual(mocks.recordOne.dataHash);
      expect(record.owner).toEqual(mocks.userOne.address);
      done();
    });
  });

  it('should return a 404 if no record was found', (done) => {
    request.get({url:`http://localhost:3000/records/hbvsdahjvasd`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(404);
      done();
    });
  });
})
