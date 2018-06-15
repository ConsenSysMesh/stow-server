const request = require('request');
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');

describe("GetPermissionedRecords", () => {
  beforeEach(cleanDatabase);

  beforeEach(async (done) => {
    const { Record, User, Permission } = require('../../models');

    const user = await User.create(mocks.userOne);
    const otherUser = await User.create(mocks.userTwo);

    const record = await Record.create({
      dataHash: mocks.recordOne.dataHash,
      metadata: mocks.recordOne.metadata,
      dataUri: mocks.recordOne.dataUri,
      owner: mocks.userOne.address
    });

    const permission = await Permission.create({
      userAddress: mocks.userOne.address,
      dataHash: mocks.recordOne.dataHash
    });

    done();
  });

  afterEach(cleanDatabase);

  it('should return a 200', (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userOne.address}/permissioned-records`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(200)
      done();
    });
  })

  it("should get the permissioned files for the user", (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userOne.address}/permissioned-records`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const record = parsedBody[0];
      expect(record.owner).toEqual(mocks.userOne.address);
      expect(record.dataHash).toEqual(mocks.recordOne.dataHash);

      done();
    });
  });

  it('should return an empty array when user has no files', (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userTwo.address}/permissioned-records`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      expect(parsedBody.length).toEqual(0);
      done();
    });
  });

  it('should send a 404 if user isnt found', (done) => {
    request.get({url:`http://localhost:3000/users/vjhsdahjvasd/permissioned-records`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(404);
      done();
    });
  });
});
