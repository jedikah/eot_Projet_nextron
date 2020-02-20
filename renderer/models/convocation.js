export const selectConvocations = (db, cb) => {
  let sql = "SELECT ";
  sql += "convocation.NumRegistre AS NumRegistre,";
  sql += "convocation.IdTrav AS IdTrav,";
  sql += "convocation.NumPv AS NumPv,";
  sql += "convocation.NomPersConv AS NomPersConv,";
  sql += "convocation.DateConv AS DateConv,";
  sql += "convocation.VilleConv AS VilleConv,";
  sql += "convocation.HeureConv AS HeureConv ";
  sql += "FROM convocation";

  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const addConvocation = (db, params, cb) => {
  let sql = "INSERT INTO convocation VALUES ( ?, ?, ?, ?, ?, ?, ? )";
  db.run(sql, params, err => {
    let newConvocation = {};
    (newConvocation.NumRegistre = params[0]),
      (newConvocation.IdTrav = params[1]),
      (newConvocation.NumPV = params[2]),
      (newConvocation.NomPersConv = params[3]),
      (newConvocation.DateConv = params[4]),
      (newConvocation.VilleConv = params[5]),
      (newConvocation.HeureConv = params[6]);
    cb(newConvocation);
  });
};

export const upDateConvocation = (db, params, cb) => {
  let sql = "UPDATE convocation SET ";
  sql += "NumRegistre = ?, IdTrav = ?, NumPV = ?, NomPersConv = ?,";
  sql += "DateConv = ?, VilleConv = ?, HeureConv = ? ";
  sql += "WHERE IdTrav = ? AND NumRegistre = ?";

  db.run(sql, params, err => {
    let updateConvocation = {};
    (updateConvocation.NumRegistre = params[0]),
      (updateConvocation.IdTrav = params[1]),
      (updateConvocation.NumPV = params[2]),
      (updateConvocation.NomPersConv = params[3]),
      (updateConvocation.DateConv = params[4]),
      (updateConvocation.VilleConv = params[5]),
      (updateConvocation.HeureConv = params[6]);
    cb(updateConvocation, params[8]);
  });
};
