import { updateTravau } from "../redux/actions/travauActions";

export const selectTravaux = (db, cb) => {
  let sql = "SELECT ";
  sql += "travau.IdTrav AS IdTrav,";
  sql += "travau.IdCli AS IdCli,";
  sql += "travau.IdFact AS IdFact,";
  sql += "travau.NumReq AS NumReq,";
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
  sql += "VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.run(sql, params, err => {
    db.all("SELECT last_insert_rowid()", (err, lastId) => {
      let newTrav = {};
      params.unshift(lastId[0]["last_insert_rowid()"]);
      newTrav.IdTrav = params[0];
      newTrav.IdCli = params[1];
      newTrav.IdFact = params[2];
      newTrav.NumReq = params[3];
      newTrav.NumTitre = params[4];
      newTrav.NomTer = params[5];
      newTrav.LocalisationTrav = params[6];
      newTrav.Fokontany = params[7];
      newTrav.DateTrav = params[8];
      newTrav.TypeTrav = params[9];
      newTrav.Prix = params[10];
      cb(newTrav);
    });
  });
};

export const updateTravaux = (db, params, cb) => {
  let sql = "UPDATE travau SET ";
  sql += "NumReq = ?, NumTitre = ?, NomTer = ?,";
  sql += "LocalisationTrav = ?, Fokontany = ?,";
  sql += "DateTrav = ?, TypeTrav = ?,";
  sql += "Prix = ?, IdCli = ?,";
  sql += "IdFact = ? WHERE IdTrav = ?";
  db.run(sql, params, err => {
    let updateTrav = {};
    updateTrav.NumReq = params[0];
    updateTrav.NumTitre = params[1];
    updateTrav.NomTer = params[2];
    updateTrav.LocalisationTrav = params[3];
    updateTrav.Fokontany = params[4];
    updateTrav.DateTrav = params[5];
    updateTrav.TypeTrav = params[6];
    updateTrav.Prix = params[7];
    updateTrav.IdCli = params[8];
    updateTrav.IdFact = params[9];
    updateTrav.IdTrav = params[10];
    cb(updateTrav);
  });
};
