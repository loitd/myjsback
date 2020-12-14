// Sequelize ORM ready for:
//  - Postgres
//  - MySQL
//  - MariaDB
//  - SQLite
//  - MS SQL Server


const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

class User extends Model {}     //extending model

User.init({
  username: DataTypes.STRING,   //model attributes
  birthday: DataTypes.DATE      //allowNull defaults to true
}, { 
    sequelize,                  //pass the connection instance 
    modelName: 'user',          //choose the model name
    tableName: 'Users',         //by default, but we can define table name directly
    timestamps: false,          //by default, sequelize automatically add createdAt & updatedAt to every model with DataTypes.DATE.
});

(async () => {
  await sequelize.sync();               //create the table if it doesnt exist
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();