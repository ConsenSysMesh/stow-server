const Record = require('./../models').record;
const Sequelize = require('sequelize');

module.exports = (req, res) => {

  //If the request contains owner and property
  if(req.param('owner') && req.param('property')){
    Record.findAll({ where: { owner: { [Sequelize.Op.eq]: req.param('owner'),}, 
                              metadata: { [Sequelize.Op.iLike]: '%'+req.param('property')+'%',}}
    }).then(records => { res.json(records)
    }).catch(err => { res.status(500).send('Error') });
  }

  //If the request contains owner and NOT property
  else if(req.param('owner')){
    Record.findAll({ where: { owner: { [Sequelize.Op.eq]: req.param('owner'),},}
    }).then(records => { res.json(records)
    }).catch(err => { res.status(500).send('Error') });
  }

  //If the request contains property and NOT owner
  else if(req.param('property')){
    Record.findAll({ where: { metadata: { [Sequelize.Op.iLike]: '%'+req.param('property')+'%',},}
    }).then(records => { res.json(records)
    }).catch(err => { res.status(500).send('Error') });
  }

  //Otherwise, return all records
  else {
    Record.findAll().then(records => { res.json(records)
    }).catch(err => { res.status(500).send('Error') });
  }
};
