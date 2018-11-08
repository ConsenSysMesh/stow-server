require('dotenv').config();
const request = require('request');
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');
const port = process.env.LINNIA_PORT;

  describe("GetAttestations", () => {
  beforeEach(cleanDatabase);
  beforeEach(async (done) => {

    const { Attestation } = require('../../models');

    for (let i = 0; i < 5; i++) {
      await Attestation.create({
      dataHash: mocks.attestations[i].dataHash,
      attester: mocks.attestations[i].attester
    });
    };

    done();
  });

  afterEach(cleanDatabase);


  it('should return the attestations with the data hash (one and two)', (done) => {
    request.get({url:`http://localhost:${port}/attestations/${mocks.attestationOne.dataHash}`}, (err, httpResponse, body) => {
      const attestations = JSON.parse(body);
      expect(attestations.length).toEqual(2);
      expect(attestations[0].dataHash).toEqual(mocks.attestationOne.dataHash);
      expect(attestations[1].dataHash).toEqual(mocks.attestationTwo.dataHash);
      expect(attestations[0].attester).toEqual(mocks.attestationOne.attester);
      expect(attestations[1].attester).toEqual(mocks.attestationTwo.attester);
      done();
    });
  });

  it('should return the attestations with the data hash (three)', (done) => {
    request.get({url:`http://localhost:${port}/attestations/${mocks.attestationThree.dataHash}`}, (err, httpResponse, body) => {
      const attestations = JSON.parse(body);
      expect(attestations.length).toEqual(1);
      expect(attestations[0].dataHash).toEqual(mocks.attestationThree.dataHash);
      expect(attestations[0].attester).toEqual(mocks.attestationThree.attester);
      done();
    });
  });


  it('should return the attestations with the data hash (four and five)', (done) => {
    request.get({url:`http://localhost:${port}/attestations/${mocks.attestationFour.dataHash}`}, (err, httpResponse, body) => {
      const attestations = JSON.parse(body);
      expect(attestations.length).toEqual(2);
      expect(attestations[0].dataHash).toEqual(mocks.attestationFour.dataHash);
      expect(attestations[1].dataHash).toEqual(mocks.attestationFive.dataHash);
      expect(attestations[0].attester).toEqual(mocks.attestationFour.attester);
      expect(attestations[1].attester).toEqual(mocks.attestationFive.attester)
      done();
    });
  });

  it('should return an empty array if no attestation', (done) => {
    request.get({url:`http://localhost:${port}/attestations/hbvsdahjvasd`}, (err, httpResponse, body) => {
      expect(JSON.parse(body)).toEqual([]);
      done();
    });
  });
})
