const { Record } = require('./../models');
const Sequelize = require('sequelize');

module.exports = (req, res, next) => {

  //Lowercase Owner address
  if(req.query['owner']){
    req.query['owner'] = req.query['owner'].toLowerCase();
  }

  //If the request contains owner and property
  if(req.query['owner'] && req.query['property']){
    Record.findAll({ where: { owner: { [Sequelize.Op.eq]: req.query['owner'],},
                              metadata: { [Sequelize.Op.iLike]: '%'+req.query['property']+'%',}}
    }).then(records => { res.json(records)
    }).catch(next);
  }

  //If the request contains owner and NOT property
  else if(req.query['owner']){
    Record.findAll({ where: { owner: { [Sequelize.Op.eq]: req.query['owner'],},}
    }).then(records => { res.json(records)
    }).catch(next);
  }

  //If the request contains property and NOT owner
  else if(req.query['property']){
    Record.findAll({ where: { metadata: { [Sequelize.Op.iLike]: '%'+req.query['property']+'%',},}
    }).then(records => { res.json(records)
    }).catch(next);
  }

  //Otherwise, return all records
  else {
    Record.findAll().then(records => { res.json(records)
    }).catch(next);
  }
};
