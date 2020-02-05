export const selectTravaux = (db, cb) => {
  let sql = "SELECT ";
  sql += "travau.IdTrav AS IdTrav,";
  sql += "travau.IdCli AS IdCli,";
  sql += "travau.IdFact AS IdFact,";
  sql += "travau.NumTitre AS NumTitre,";
  sql += "travau.NomTer AS NomTer,";
  sql += "travau.LocalisationTrav AS LocalisationTrav,";
  sql += "travau.Fokontany AS Fokontany,";
  sql += "travau.DateTrav AS DateTrav,";
  sql += "travau.TypeTrav AS TypeTrav,";
  sql += "travau.Prix AS Prix ";
  sql += "FROM ";
  sql += "travau";

  db.all(sql, (err, rows) => cb(rows));
};

export const addTravaux = (db, params, cb) => {
  let sql = "INSERT INTO travau ";
  sql += "VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.run(sql, params, err => {
    console.log("errrr:  ", err);
    db.all("SELECT last_insert_rowid()", (err, lastId) => {
      let newTrav = {};
      params.unshift(lastId[0]["last_insert_rowid()"]);
      console.log("last row id:", lastId[0]);
      newTrav.IdTrav = params[0];
      newTrav.IdCli = params[1];
      newTrav.IdFact = params[2];
      newTrav.NumTitre = params[3];
      newTrav.NomTer = params[4];
      newTrav.LocalisationTrav = params[5];
      newTrav.Fokontany = params[6];
      newTrav.DateTrav = params[7];
      newTrav.TypeTrav = params[8];
      newTrav.Prix = params[9];
      cb(newTrav);
    });
  });
};
