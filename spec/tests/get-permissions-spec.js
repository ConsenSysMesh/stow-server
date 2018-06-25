const request = require('request');
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');

describe("GetPermissionedRecords", () => {
  beforeEach(cleanDatabase);

  beforeEach(async (done) => {
    const { Record, User, Permission } = require('../../models');

    await User.create(mocks.userOne);
    await User.create(mocks.userTwo);

    await Record.create({
      dataHash: mocks.recordOne.dataHash,
      metadata: mocks.recordOne.metadata,
      dataUri: mocks.recordOne.dataUri,
      owner: mocks.userOne.address
    });

    await Permission.create({
      owner: mocks.userOne.address,
      dataHash: mocks.recordOne.dataHash,
      viewer: mocks.userTwo.address,
      dataUri: mocks.recordOne.dataUri
    });

    done();
  });

  afterEach(cleanDatabase);

  it('should return a 200', (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userOne.address}/permissions`}, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(200)
      done();
    });
  })

  it("should get the permissions that the user owns", (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userOne.address}/permissions`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const asOwner = parsedBody.asOwner;
      const record = asOwner[0];
      expect(record.owner).toEqual(mocks.userOne.address);
      expect(record.dataHash).toEqual(mocks.recordOne.dataHash);

      done();
    });
  });

  it("should return an empty array if user owns no records", (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userTwo.address}/permissions`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const asOwner = parsedBody.asOwner;
      expect(asOwner.length).toEqual(0);

      done();
    });
  });

  it("should get the permissions that the user can view", (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userTwo.address}/permissions`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const asViewer = parsedBody.asViewer;
      const record = asViewer[0];
      expect(record.viewer).toEqual(mocks.userTwo.address);
      expect(record.dataHash).toEqual(mocks.recordOne.dataHash);

      done();
    });
  });

  it("should return an empty array if user can view no records", (done) => {
    request.get({url:`http://localhost:3000/users/${mocks.userOne.address}/permissions`}, (err, httpResponse, body) => {
      const parsedBody = JSON.parse(body);
      const asViewer = parsedBody.asViewer;
      expect(asViewer.length).toEqual(0);

      done();
    });
  });
});
