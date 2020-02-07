export const selectConvocations = (db, cb) => {
  let sql = "SELECT ";
  sql += "convocation.NumRegistre AS NumRegistre,";
  sql += "convocation.IdTrav AS IdTrav,";
  sql += "convocation.NomPersConv AS NomPersConv,";
  sql += "convocation.DateConv AS DateConv,";
  sql += "convocation.VilleConv AS VilleConv,";
  sql += "convocation.HeureConv AS HeureConv ";
  sql += "FROM convocation";

  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const addConvoction = (db, params, cb) => {
  let sql = "INSERT INTO convocation VALUES ( ?, ? ,? ,? ,? ,? )";
  db.run(sql, params, err => {
    let newConvocation = {};
    (newConvocation.NumRegistre = params[0]),
      (newConvocation.IdTrav = params[1]),
      (newConvocation.NomPersConv = params[2]),
      (newConvocation.DateConv = params[3]),
      (newConvocation.VilleConv = params[4]),
      (newConvocation.HeureConv = params[5]);
    cb(newConvocation);
  });
};
