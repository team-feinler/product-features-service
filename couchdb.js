const nano = require('nano')('http://admin:Tacosrgood1233!@localhost:5984');

nano.db.destroy('tacos')
  .then((data) => {
    console.log(data);
  });
