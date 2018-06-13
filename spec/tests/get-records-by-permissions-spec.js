const { userOne, recordOne } = require('./../mocks');
const request = require('request');

describe("GetPermissionedRecords", () => {
  beforeEach((done) => {
    const { Record, User, Permission } = require('../../models');

    User
      .findOrCreate({ where: userOne })
      .then(() => {
        return Record
          .findOrCreate({
              where: {
              dataHash: recordOne.dataHash,
              metadata: recordOne.metadata,
              owner: userOne.address
            }
          })
          .then(() => (
            Permission.findOrCreate({
              where: {
                userAddress: userOne.address,
                dataHash: recordOne.dataHash
              }
            })
          ));
      })
      .then(() => done());
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
});
