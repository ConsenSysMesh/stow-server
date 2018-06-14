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
}

module.exports = Mocks;
