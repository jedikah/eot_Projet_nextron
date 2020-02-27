export const addFacture = (db, params, cb) => {
  let sql = "INSERT INTO facture VALUES (";
  sql += "NULL, ?, ?)";
  db.run(sql, [params[0], params[1]], err => {
    db.all("SELECT last_insert_rowid();", (err, id) => {
      let sql = "UPDATE travau SET ";
      sql += "IdFact = ? ";
      sql += "WHERE IdTrav = ?";

      for (let i = 0; i < params[2].length; i++) {
        //db.run(sql, [id[0]["last_insert_rowid()"], params[2][i].IdTrav]);
        db.run(sql, [params[2][i].IdFact, params[2][i].IdTrav]);
      }
    });
  });
};

export const selectFacture = (db, cb) => {
  let sql = "SELECT facture.IdFact AS IdFact,";
  sql += "facture.IdCli AS IdCli,";
  sql += "facture.DateFact AS DateFact ";
  sql += "FROM facture ORDER BY IdFact DESC LIMIT 10";

  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const selectCountFact = (db, cb) => {
  let sql =
    "SELECT facture.IdFact AS IdFact, COUNT(IdFact) AS Count FROM facture";
  db.all(sql, (err, rows) => {
    cb(rows[0].Count);
  });
};

export const selectFacturePaging = (db, params, cb) => {
  let sql = "SELECT facture.IdFact AS IdFact,";
  sql += "facture.IdCli AS IdCli,";
  sql += "facture.DateFact AS DateFact ";
  sql += "FROM facture ORDER BY IdFact DESC LIMIT 10 OFFSET ?";

  db.all(sql, params, (err, rows) => {
    cb(rows);
  });
};

export const updateFacture = (db, params) => {
  let sql = "UPDATE facture SET ";
  sql += "DateFact = ? WHERE IdFact = ?";
  db.run(sql, [params[0], params[1]]);

  sql = "UPDATE travau SET ";
  sql += "IdFact = ? WHERE IdTrav = ?";
};

export const selectFactureBySearchName = (db, params, cb) => {
  let sql = "SELECT facture.IdFact AS IdFact,";
  sql += "facture.IdCli AS IdCli,";
  sql += "facture.DateFact AS DateFact ";
  sql += "FROM facture WHERE IdCli = ?";

  db.all(sql, params, (err, rows) => {
    cb(rows);
  });
};
