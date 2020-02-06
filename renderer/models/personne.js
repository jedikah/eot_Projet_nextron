export const addPersone = (db, params, cb) => {
  let sql = "INSERT INTO personne VALUES (NULL, ?)";

  db.run(sql, params, err => {
    db.all("SELECT last_insert_rowid();", (err, rowId) => {
      cb(rowId[0]["last_insert_rowid()"]);
    });
  });
};

export const updatePersonne = (db, params, cb) => {
  let sql = "UPDATE personne SET ";
  sql += "Nom = ? WHERE IdPersonne = ?";
  db.run(sql, params[0], params[1]);
};
