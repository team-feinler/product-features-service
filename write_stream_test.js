const faker = require('faker');
const fs = require('fs');
const { Pool } = require('pg');
const copyFrom  = require('pg-copy-streams').from;

const lines = 2000000;
const fileName = 'test.csv';
const stream = fs.createWriteStream(fileName);

const pool = new Pool({
  user: 'tylerbrown',
  password: '',
  host: 'localhost',
  database: 'test',
  port: 5432,
});

const createUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const age = Math.ceil(Math.random() * 100);
  const likesHiking = Math.ceil(Math.random() * 10) > 5;

  return `${firstName},${lastName},${age},${likesHiking}\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines;

  const writing = () => {
    let canWrite = true;

    do {
      i--;
      let user = createUser();
      if (i === 0) {
        writeStream.write(user, encoding, done);
      } else {
        writeStream.write(user, encoding);
      }
    } while (i > 0 && canWrite);

    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
}

stream.write(`firstName,lastName,age,likesHiking\n`);

const copyToDb = async (filePath) => {
  try {
    await startWriting(stream, 'utf-8', () => {
      stream.end();
    });
  } catch (err) {
    console.log(err);
  }

  pool.connect(function (err, client, done) {
    const queryStream = client.query(copyFrom('COPY users (first_name, last_name, age, likes_hiking) FROM STDIN CSV HEADER'));
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', done);
    queryStream.on('error', done);
    queryStream.on('finish', done);
    fileStream.pipe(queryStream);
  });
}

copyToDb(`${__dirname}/test.csv`);
