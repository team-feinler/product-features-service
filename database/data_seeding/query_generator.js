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

  return query;
}

module.exports.createIndex = (table, indexName, column) => {
  const query = `CREATE INDEX ${indexName} ON ${table} (${column});`

  return query;
}

module.exports.getFeaturesForProductId = (productId) => {
  const query = `SELECT f.feature_banner_header, f.feature_banner_text_1, f.feature_banner_text_2, f.feature_setup_header, f.feature_setup_description_1, f.feature_setup_description_2, f.feature_setup_description_3, f.additional_features_header, f.additional_features_description, fl.header AS fl_header, fl.description AS fl_description, cg.title AS cg_title, cg.description AS cg_description FROM features AS f INNER JOIN features_list AS fl ON f.product_id = fl.product_id INNER JOIN content_grid_feature_items AS cg ON f.product_id = cg.product_id WHERE f.product_id = ${productId};`;

  return query;
}