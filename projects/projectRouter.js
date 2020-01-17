const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel.js');

const Action = require('../data/helpers/actionModel');


//router endpoints

//GET 
router.get('/', (req, res) => {
  Project.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "We could not get any projects"})
    });
})

router.get('/:id', (req, res) => {
  Project.get(req.params.id)
    .then(project => {
      if(project){

        res.status(200).json(project)
      } else {
        res.status(404).json({message: "Project could not be found"})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "We could not get the project"})
    });
})

//Post

router.post('/', (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error adding project"})
    });
})

//Update

router.put('/:id', (req, res) => {
  const changes = req.body;
  Project.update(req.params.id, changes)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error updating the project"})
    });
});

//Delete :(

router.delete('/:id', (req, res) => {
  Project.remove(req.params.id)
    .then(project => {
      res.status(200).json({message: "Project deleted"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error deleting the project"})
    });
})

//Get Actions

//This one below me I don't quite understand.

router.get('/:id', validateProjectId, (req, res) => {
  Action.getProjectActions()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({message: "Error retrieving Project Actions"})
    })
})


function validateProjectId(req, res, next) {
  if(req.params.id === req.params.id){
    next();
  } else {
    res.status(400).json({message: "Invalid Project Id"})
  }
}


module.exports = router;