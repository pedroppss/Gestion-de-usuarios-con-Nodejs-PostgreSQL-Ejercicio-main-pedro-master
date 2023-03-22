

/* Creating a table in the database. */
module.exports = (sequelize, Sequelize) => {
    /* Creating a table in the database. */
    const department = sequelize.define("departamentos", {
      title: {
        type: Sequelize.STRING
      },
     /* Creating a column in the table. */
      description: {
        type: Sequelize.STRING
      },
      /* Creating a column in the table. */
      ubicacion:{
        type: Sequelize.STRING
      },
     /* Creating a column in the table. */
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return department;
  };
