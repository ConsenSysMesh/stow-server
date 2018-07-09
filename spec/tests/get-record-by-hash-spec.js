require('dotenv').config();
const request = require('request');
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');
const port = process.env.LINNIA_PORT;

describe("GetRecord", () => {
  beforeEach(cleanDatabase);

  beforeEach(async (done) => {
    const { Record } = require('../../models');

    const record = await Record.create({
      dataHash: mocks.recordOne.dataHash,
      metadata: mocks.recordOne.metadata,
      dataUri: mocks.recordOne.dataUri,
      owner: mocks.userOne.address
    });

    done();
  });

  afterEach(cleanDatabase);

  it('should return the record with the data hash', (done) => {
    request.get({url:`http://localhost:${port}/records/${mocks.recordOne.dataHash}`}, (err, httpResponse, body) => {
      const record = JSON.parse(body);
      expect(record.dataHash).toEqual(mocks.recordOne.dataHash);
      expect(record.owner).toEqual(mocks.userOne.address);
      done();
    });
  });

  it('should return a 404 if no record was found', (done) => {
    request.get({url:`http://localhost:${port}/records/hbvsdahjvasd`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(404);
      done();
    });
  });
})
