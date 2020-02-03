export const selectLetreCharges = (db, cb) => {
  let sql = "SELECT ";
  sql += "lettrecharge.NumRTX AS NumRTX,";
  sql += "lettrecharge.IdTrav AS IdTrav,";
  sql += "lettrecharge.DateRTX AS DateRTX,";
  sql += "lettrecharge.VilleL AS VilleL,";
  sql += "lettrecharge.DateL AS DateL,";
  sql += "lettrecharge.Objet AS  Objet ";
  sql += "FROM ";
  sql += "lettrecharge ";
  sql += "INNER JOIN travau ON travau.IdTrav = lettrecharge.IdTrav";

  db.all(sql, (err, rows) => cb(rows));
};
