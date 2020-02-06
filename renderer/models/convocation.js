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
