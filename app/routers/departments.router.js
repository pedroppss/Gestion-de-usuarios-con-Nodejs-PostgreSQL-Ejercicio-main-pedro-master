
/* This is a route that will call the deleteAll function in the departamentos.controller.js file. */
module.exports = app => 
{
    const departamentoss = require("../Controllers/departments.controller.js");
  
    var router = require("express").Router();
  
    
    /* Creating a new department. */
    router.post("/", departamentoss.create);
  
    /* Creating a route that will call the findAll function in the departamentos.controller.js file. */
    router.get("/", departamentoss.findAll);
  
    
   /* This is a route that will call the findAllPublished function in the departamentos.controller.js
   file. */
    router.get("/published", departamentoss.findAllPublished);
  
    
    /* This is a route that will call the findOne function in the departamentos.controller.js file. */
    router.get("/:id", departamentoss.findOne);
  
    
    /* This is a route that will call the update function in the departamentos.controller.js file. */
    router.put("/:id", departamentoss.update);
  
    
    /* This is a route that will call the delete function in the departamentos.controller.js file. */
    router.delete("/:id", departamentoss.delete);
  
    
    /* This is a route that will call the deleteAll function in the departamentos.controller.js file. */
    router.delete("/", departamentoss.deleteAll);
  
    /* This is a route that will call the deleteAll function in the departamentos.controller.js file. */
    app.use('/api/departamentoss', router);
  };
