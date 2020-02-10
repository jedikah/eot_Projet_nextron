export const addPV = (db, params, cb) => {
  let sql = "INSERT INTO pv VALUES (NULL, ?, ?, ?, ?, ?)";

  db.run(sql, params, err => {
    cb(params);
  });
};
