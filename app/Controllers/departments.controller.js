
/* Importing the database and the models. */
const db = require("../models/index.js");
const Department = db.departamentoss;
const Op = db.Sequelize.Op;
 
/* This is a function that creates a new department. */
exports.create = (req, res) => {
    // Validate request.
    if (!req.body.title) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }
  
    // Create a department
    const department = 
    {
      title: req.body.title,
      description: req.body.description,
      ubicacion:req.body.ubicacion,
      published: req.body.published ? req.body.published : false
    };
  
    //Save Department in the database
    Department.create(department)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "err.message || Some error occurred while creating the Department"
            
        });
      });
  };
 /* This is a function that finds all the departments. */
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Department.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving departments."
        });
      });
  };
  /* This is a function that finds a department by its id. */
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Department.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Can't find apartment with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Failed to retrieve department with id=" + id
        });
      });
  };
  /* This is a function that updates a department. */
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Department.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "The department was successfully upgraded."
          });
        } else {
          res.send({
            message: `Cannot update department with id=${id}. Because no apartment was found or it is empty.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating department with id=" + id
        });
      });
  };
  /* This is a function that deletes a department. */
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Department.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "The department was successfully deleted"
          });
        } else {
          res.send({
            message: `Cannot delete department with id=${id}. Because no apartment was found.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete department with id=" + id
        });
      });
  };
  /* Deleting all the departments. */
  exports.deleteAll = (req, res) => {
    Department.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Departments were successfully removed!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while deleting all departments."
        });
      });
  };
  /* This is a function that finds all the departments that are published. */
  exports.findAllPublished = (req, res) => {
    Department.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving departments."
        });
      });
  };
 