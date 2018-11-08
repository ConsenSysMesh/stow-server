class Mocks {

  static get userOne() {
    return {
      address: '0x48105d85bc552cab48a76919d0a5de80c30b7418'
    };
  };

  static get userTwo() {
    return {
      address: '0x5f12c53f54b668afae818dad56e109ef7815b015'
    };
  };

  static get userThree() {
    return {
      address: '0x9fe12ec48823b7c9170164d4f6619fce2706c5a0'
    };
  };

  static get userFour() {
    return {
      address: '0x31aaa50403416d6e56e3399868930947c40f42dc'
    };
  };

  static get userFive() {
    return {
      address: '0xe27f1805ad9a3921146021eb3d39114280bc8315'
    };
  };

  static get users() {
    return [
      this.userOne,
      this.userTwo,
      this.userThree,
      this.userFour,
      this.userFive
    ];
  }

  static get recordOne() {
    return {
      dataHash: '0xdb98e799294d09a5feae382cdc83cd540643cf9b1782a1d53962335784a2c9e1',
      metadata: '2018-03-29,ACTIVITIES',
      sigCount: 1,
      dataUri: '0x5fa90b48ace758cc7264c843ba80dd5f4148675b280844393092046fa1ac2217',
      irisScore: 1
    }
  };

  static get recordTwo() {
    return {
      dataHash: '0xa53da8a12c091f072cd64fea89ec9132acdc90f9f73d25d1928448a7354fef64',
      metadata: '2018-03-25,ACTIVITIES',
      dataUri: '0x5fa90b48ace758cc7264c843ba80dd5f4148675b280844393092046fa1ac2217',
      sigCount: 1,
      irisScore: 1
    };
  };

  static get recordThree() {
    return {
      dataHash: '0xe5be133be6ce86f305e66d8a6a9757d7289e05d3d6a2aea52e4969b0aa39fee5',
      metadata: '2018-04-06,ACTIVITIES',
      dataUri: '0x5fa90b48ace758cc7264c843ba80dd5f4148675b280844393092046fa1ac2217',
      sigCount: 1,
      irisScore: 1
    };
  };

  static get records() {
    return [
      this.recordOne,
      this.recordTwo,
      this.recordThree
    ];
  };

  static get attestationOne() {
    return {
     attester: '0x48105d85bc552cab48a76919d0a5de80c30b7418',
     dataHash: '0xc3498851be5308409a6fa95923bfcc8aff724247e0a3db57960a116c3e25a243'
    };
  };

  static get attestationTwo() {
    return {
     attester: '0x5f12c53f54b668afae818dad56e109ef7815b015',
     dataHash: '0xc3498851be5308409a6fa95923bfcc8aff724247e0a3db57960a116c3e25a243'
    };
  };

  static get attestationThree() {
    return {
     attester: '0x9fe12ec48823b7c9170164d4f6619fce2706c5a0',
     dataHash: '0xb2922ca861f838ec8c94c1163baed891e0b9b8eeade739d2dde4c0bfc9503107'
    };
  };

  static get attestationFour() {
    return {
     attester: '0x31aaa50403416d6e56e3399868930947c40f42dc',
     dataHash: '0x87e5dc3e0b87b1f7f4fc49ce4ef28918b486419eb4c0ab345d4137ce3e92d975'
    };
  };

  static get attestationFive() {
    return {
     attester: '0xe27f1805ad9a3921146021eb3d39114280bc8315',
     dataHash: '0x87e5dc3e0b87b1f7f4fc49ce4ef28918b486419eb4c0ab345d4137ce3e92d975'
    };
  };

  static get attestations() {
    return [
      this.attestationOne,
      this.attestationTwo,
      this.attestationThree,
      this.attestationFour,
      this.attestationFive
    ];
  }
}

module.exports = Mocks;
