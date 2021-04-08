//------------------------------------
// Seeding Query Generators
//------------------------------------

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

//------------------------------------
// Database Query Generators
//------------------------------------

module.exports.generateInsertFeatureQuery = (table, dataObj) => {
  const columns = Object.keys(dataObj).join(', ');
  const data = Object.values(dataObj).join(', ');

  const query = `INSERT INTO ${table} (${columns}) VALUES (${data}) RETURNING product_id;`;

  return query;
}

module.exports.generateGetFeatureQuery = (productId) => {
  const query =
    `SELECT
    f.product_id,
    f.feature_banner_header,
    f.feature_banner_text_1,
    f.feature_banner_text_2,
    f.feature_setup_header,
    f.feature_setup_description_1,
    f.feature_setup_description_2,
    f.feature_setup_description_3,
    f.additional_features_header,
    f.additional_features_description,
    fl.id_encid AS fl_id_encid,
    fl.header AS fl_header,
    fl.description AS fl_description,
    cg.id_encid AS cg_id_encid,
    cg.title AS cg_title,
    cg.description AS cg_description

    FROM features AS f
    INNER JOIN features_list AS fl
    ON f.product_id = fl.product_id
    INNER JOIN content_grid_feature_items AS cg
    ON f.product_id = cg.product_id

    WHERE f.product_id = ${productId};`;

  return query;
}

module.exports.generateUpdateFeatureQuery = (table, productId, dataObj) => {
  const keyValues = [];

  for (let key in dataObj) {
    keyValues.push(`${key} = ${dataObj[key]}`);
  }
  const updates = keyValues.join(', ');

  const query = `UPDATE ${table} SET ${updates} WHERE product_id = ${productId} RETURNING *;`;

  return query;
}

module.exports.generateDeleteFeatureQuery = (table, productId) => {
  const query = `DELETE FROM ${table} WHERE product_id = ${productId} RETURNING product_id;`;

  return query;
}

//------------------------------------
// Database Cleaning Query Generators
//------------------------------------

module.exports.generateCleanTableQuery = (table, ceilingProductId) => {
  const query =  `DELETE FROM ${table} WHERE product_id > ${ceilingProductId}`;

  return query;
}
