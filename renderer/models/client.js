export const selectClients = (db, cb) => {
  let sql = "SELECT ";
  sql += "client.IdCli AS IdCli,";
  sql += "client.IdPersonne AS IdPersonne,";
  sql += "personne.Nom AS Nom,";
  sql += "client.Domicile AS Domicile,";
  sql += "client.Contact AS Contact ";
  sql += "FROM ";
  sql += "client ";
  sql += "INNER JOIN personne ON personne.IdPersonne = client.IdPersonne";

  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const addClient = (db, params, cb) => {
  let sql = "INSERT INTO client VALUES (NULL,?,?,?)";
  db.run(sql, params, err1 => {
    db.all("SELECT last_insert_rowid();", (err2, id) => {
      let newClients = {};
      params.unshift(id[0]["last_insert_rowid()"]);

      newClients.IdCli = params[0];
      newClients.IdPersonne = params[1];
      newClients.Domicile = params[2];
      newClients.Contact = params[3];
      cb(newClients);
    });
  });
};

export const updateClient = (db, params, cb) => {
  let sql = "UPDATE client SET ";
  sql += "Domicile = ?, ";
  sql += "Contact = ? WHERE IdCli = ?";
  db.run(sql, params[0], params[1], params[2]);
};
