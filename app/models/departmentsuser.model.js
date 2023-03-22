


/* This is creating a table in the database. */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "user", {
       /* This is creating a column in the table. */
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
       /* This is creating a column in the table. */
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
       /* This is creating a column in the table. */
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return User
 };