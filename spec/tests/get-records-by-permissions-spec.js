const { userOne, userTwo, recordOne } = require('./../mocks');
const request = require('request');

describe("GetPermissionedRecords", () => {
  beforeEach(async (done) => {
    const { Record, User, Permission } = require('../../models');

    const user = await User.findOrCreate({
      where: userOne
    });

    const otherUser = await User.findOrCreate({
      where: userTwo
    });

    const record = await Record.findOrCreate({
      where: {
        dataHash: recordOne.dataHash,
        metadata: recordOne.metadata,
        dataUri: recordOne.dataUri,
        owner: userOne.address
      }
    });

    const permission = await Permission.findOrCreate({
      where: {
        userAddress: userOne.address,
        dataHash: recordOne.dataHash
      }
    });

    done();
  });

  it('should return a 200', (done) => {
    request.get({url:`http://localhost:3000/users/${userOne.address}/permissioned-records`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(200)
      done();
    });
  })

  it("should get the permissioned files for the user", (done) => {
    request.get({url:`http://localhost:3000/users/${userOne.address}/permissioned-records`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const record = parsedBody[0];
      expect(record.owner).toEqual(userOne.address);
      expect(record.dataHash).toEqual(recordOne.dataHash);
      done();
    });
  });

  it('should return an empty array when user has no files', (done) => {
    request.get({url:`http://localhost:3000/users/${userTwo.address}/permissioned-records`}, (err, httpResponse, body) => {
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
