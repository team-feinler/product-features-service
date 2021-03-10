const { user, password } = require('./database_configs/nosql_database.config.js');
const nano = require('nano')(`http://${user}:${password}@localhost:5984`);
const faker = require('faker');
const md5 = require('md5');

nano.db.destroy('tacos')
  .then((data) => {
    console.log(data);
  });
