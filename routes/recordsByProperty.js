const Record = require('./../models').record;
const Sequelize = require('sequelize');

module.exports = (req, res) => {
  
  //If the request contains owner
  if(req.param('owner')){
    Record.findAll({
      where: {
        owner: {
          [Sequelize.Op.eq]: req.param('owner'),
        },
        metadata: {
          [Sequelize.Op.iLike]: '%'+req.param('property')+'%',
        }
      }
    }).then(records => {
      res.json(records)
    })
    
    // Catch errors
    .catch(function (err) {
      const errors = err.errors.map(x => x.message);
      res.status(400).send({ errors: errors })
    });
  }
  //If the request does NOT contains owner
  else{
    Record.findAll({
      where: {
        metadata: {
          [Sequelize.Op.iLike]: '%'+req.param('property')+'%',
        }
      }
    }).then(records => {
      res.json(records)
    })
    
    // Catch errors
    .catch(function (err) {
      const errors = err.errors.map(x => x.message);
      res.status(400).send({ errors: errors })
    });

  }

};
