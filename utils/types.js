
const bigNumberToNumber = (bigNumber) => {
  if (bigNumber.toNumber) {
    return bigNumber.toNumber();
  } else {
    throw Error("Argument is not a big number.");
  }
}

module.exports = {
  bigNumberToNumber
};
