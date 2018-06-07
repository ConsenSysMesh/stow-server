const Event = require('./../models').event;

module.exports = (req, res) => {
  Event.create({
    type: 'a thing'
  }).then(event => res.json(event));
};
