module.exports.generateBulkInsertQuery = (table, columns, data) => {
  const joinedColumns = columns.join(', ');

  const query = `INSERT INTO ${table} (${joinedColumns}) VALUES ${data};`;

  return query;
}

module.exports.generateCopyQuery = (table, columnNames) => {
  const columns = columnNames.join(', ');

  const query = `COPY ${table} (${columns}) FROM STDIN CSV HEADER;`;

  return query;
}

module.exports.addPrimaryKey = (table, pk) => {
  const query = `ALTER TABLE ${table} ADD PRIMARY KEY (${pk});`

  return query;
}

module.exports.addForeignKey = (table, fk, referenceTable, referenceKey) => {
  const query = `ALTER TABLE ${table} ADD FOREIGN KEY (${fk}) REFERENCES ${referenceTable} (${referenceKey});`

  return query;
}

module.exports.addUniqueConstraint = (table, constraintName, column) => {
  const query = `ALTER TABLE ${table} ADD CONSTRAINT ${constraintName} UNIQUE (${column});`
}
