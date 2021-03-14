module.exports.generateInsertQuery = (table, data) => {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data).join(', ');

  const query = `INSERT INTO ${table} (${columns}) VALUES (${values});`;

  return query;
}
