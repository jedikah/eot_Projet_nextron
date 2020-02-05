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

export const addClient = (db, params) => {
  let sql = "INSERT INTO client VALUES(NULL,?,?,?)";
  db.run(cli, params, () => {
    db.all("SELECT last_insert_rowid();", [], (err, id) => {
      params.unshift(id[0]["last_insert_rowid()"]);
      let p = {
        clients: [
          {
            IdCli: parms[0],
            IdPersonne: params[1],
            Domicile: params[2],
            Contact: params[3]
          }
        ]
      };
      cb(p);
    });
  });
};
