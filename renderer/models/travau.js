import { updateTravau } from "../redux/actions/travauActions";

export const selectTravaux = (db, cb) => {
  let sql = "SELECT ";
  sql += "travau.IdTrav AS IdTrav,";
  sql += "travau.IdCli AS IdCli,";
  sql += "travau.IdFact AS IdFact,";
  sql += "travau.NumReq AS NumReq,";
  sql += "travau.DateReq AS DateReq,";
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
  sql += "VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.run(sql, params, err => {
    db.all("SELECT last_insert_rowid()", (err, lastId) => {
      let newTrav = {};
      params.unshift(lastId[0]["last_insert_rowid()"]);
      newTrav.IdTrav = params[0];
      newTrav.IdCli = params[1];
      newTrav.IdFact = params[2];
      newTrav.NumReq = params[3];
      newTrav.DateReq = params[4];
      newTrav.NumTitre = params[5];
      newTrav.NomTer = params[6];
      newTrav.LocalisationTrav = params[7];
      newTrav.Fokontany = params[8];
      newTrav.DateTrav = params[9];
      newTrav.TypeTrav = params[10];
      newTrav.Prix = params[11];
      sql = "INSERT INTO pv VALUES (?, '', '', '', '')";
      db.run(sql, params[0]);
      cb(newTrav);
    });
  });
};

export const updateTravaux = (db, params, cb) => {
  let sql = "UPDATE travau SET ";
  sql += "NumReq = ?, DateReq = ?,";
  sql += "NumTitre = ?, NomTer = ?,";
  sql += "LocalisationTrav = ?, Fokontany = ?,";
  sql += "DateTrav = ?, TypeTrav = ?,";
  sql += "Prix = ?, IdCli = ?,";
  sql += "IdFact = ? WHERE IdTrav = ?";
  db.run(sql, params, err => {
    let updateTrav = {};
    updateTrav.NumReq = params[0];
    updateTrav.DateReq = params[1];
    updateTrav.NumTitre = params[2];
    updateTrav.NomTer = params[3];
    updateTrav.LocalisationTrav = params[4];
    updateTrav.Fokontany = params[5];
    updateTrav.DateTrav = params[6];
    updateTrav.TypeTrav = params[7];
    updateTrav.Prix = params[8];
    updateTrav.IdCli = params[9];
    updateTrav.IdFact = params[10];
    updateTrav.IdTrav = params[11];
    cb(updateTrav);
  });
};

export const checkFacture = (db, params, cb) => {
  let sql =
    "SELECT travau.IdTrav AS IdTrav, travau.IdFact AS IdFact FROM travau WHERE IdTrav = ?";
  db.all(sql, params, (err, rows) => {
    cb(rows[0].IdFact);
  });
};

export const updateFactureTrav = (db, params) => {
  let sql = "UPDATE travau SET ";
  sql += "IdFact = ? WHERE IdTrav = ?";

  db.run(sql, params);
};
