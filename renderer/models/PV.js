export const selectPV = (db, cb) => {
  let sql = "SELECT ";
  sql += "pv.PieceJust AS PieceJust,";
  sql += "pv.Commune AS Commune,";
  sql += "pv.District AS District,";
  sql += "pv.Region AS Region,";
  sql += "pv.NumPV AS NumPV ";
  sql += "FROM pv";

  db.all(sql, (err, rows) => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].PieceJust === null) rows[i].PieceJust = "";
      if (rows[i].Commune === null) rows[i].Commune = "";
      if (rows[i].District === null) rows[i].District = "";
      if (rows[i].Region === null) rows[i].Region = "";
      if (rows[i].NumPV === null) rows[i].NumPV = "";
    }
    cb(rows);
  });
};

export const addPV = (db, params, cb) => {
  let sql = "UPDATE pv SET ";
  sql += "PieceJust = ?,";
  sql += "Commune = ?,";
  sql += "District = ?,";
  sql += "Region = ? WHERE NumPV=?";

  db.run(sql, params, err => {
    let updatePV = {};
    updatePV.PieceJust = params[0];
    updatePV.Commune = params[1];
    updatePV.District = params[2];
    updatePV.Region = params[3];
    updatePV.NumPV = params[4];
    cb(updatePV);
  });
};
