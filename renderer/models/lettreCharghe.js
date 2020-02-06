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

export const addLettreCharge = (db, params, cb) => {
  console.log({ params });
  const sql = "INSERT INTO lettrecharge VALUES (NULL, ?, ?, ?, ?, ?)";

  db.run(sql, params, err => {
    db.all("SELECT last_insert_rowid()", (err, lastId) => {
      let newLettre = {};

      newLettre.NumRTX = lastId[0]["last_insert_rowid()"];
      newLettre.IdTrav = params[0];
      newLettre.DateRTX = params[1];
      newLettre.VilleL = params[2];
      newLettre.DateL = params[3];
      newLettre.Objet = params[4];
      cb(newLettre);
    });
  });
};

export const updateLettreCharge = (db, params, cb) => {
  let sql = "UPDATE lettrecharge SET ";
  sql += "NumRTX = ?, DateRTX = ?,";
  sql += "VilleL = ?, DateL = ?, ";
  sql += "Objet = ? WHERE IdTrav = ?";
  db.run(sql, params[0], params[1], params[2], params[3], params[4], params[5]);
};
