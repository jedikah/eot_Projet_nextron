export const selectTravaux = (db, cb) => {
  let sql = "SELECT ";
  sql += "travau.IdTrav AS IdTrav,";
  sql += "personne.Nom AS Nom,";
  sql += "travau.NumTitre AS NumTitre,";
  sql += "travau.NomTer AS NomTer,";
  sql += "travau.LocalisationTrav AS LoacalisationTrav,";
  sql += "travau.Fokontany AS Fokontany,";
  sql += "travau.DateTrav AS DateTrav,";
  sql += "travau.TypeTrav AS TypeTrav,";
  sql += "travau.Prix AS Prix ";
  sql += "FROM ";
  sql += "travau ,";
  sql += "personne ";
  sql += "INNER JOIN client ON personne.IdPersonne = client.IdPersonne ";
  sql += "AND client.IdCli = travau.IdCli";

  db.all(sql, (err, rows) => cb(rows));
};

export const addTravaux = (db, params, cb) => {
  let sql = "INSERT INTO travau ";
  sql += "VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.run(sql, params, err => {
    db.all("SELECT last_insert_rowid()", (err, lastId) => {
      let newTrav = {};
      params.unshift(lastId[0]["last_insert_rowid()"]);
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
