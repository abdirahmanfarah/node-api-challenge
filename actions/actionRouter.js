const express = require('express');

const router = express.Router();

const Action = require('../data/helpers/actionModel.js');

//Router endpoints

//Get

router.get('/', (req, res) => {
  Action.get()
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "We could not get any project actions"})
  });
})

//Get by Id
// router.get('/:id', (req, res) => {
//   Action.get(req.params.id)
//   .then(action => {
//     res.status(200).json(action)
//   })
//   .catch(error => {
//     console.log(error)
//     res.status(500).json({message: "We could not get any project actions"})
//   });
// })

//Add Action

router.post('/', validateActionId, (req, res) => {
  Action.insert(req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error, action could not be posted"})
    });
})

//Update Action

router.put('/:id', (req, res) => {
  const changes = req.body;
  Action.update(req.params.id, changes)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error, action could not be updated"})
    });
})

//Delete Action

router.delete('/:id', (req, res) => {
  Action.remove(req.params.id)
    .then(action => {
      res.status(200).json({message: "Action deleted"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error deleting the action"})
    });
})

function validateActionId(req, res, next) {
  if(req.params.id === req.params.id){
    next();
  } else {
    res.status(400).json({message: "Invalid Action Id"})
  }
}

module.exports = router;