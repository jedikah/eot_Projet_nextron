export const selectUsers = (db, cb) => {
  let sql = "SELECT ";
  sql += "user.IdUser AS IdUser,";
  sql += "user.IdPersonne AS IdPersonne,";
  sql += "personne.Nom AS Nom,";
  sql += "user.PassWord AS PassWord ";
  sql += "FROM ";
  sql += "user ";
  sql += "INNER JOIN personne ON user.IdPersonne = personne.IdPersonne";

  let select = "";

  //select = Promise((resolve, reject) => {
  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const updateUser = (db, params, cb) => {
  console.log({ params });
  let sql = "UPDATE user SET ";
  sql += "PassWord = ? WHERE IdUser = ?";
  db.run(sql, [params[0], params[1]]);

  sql = "UPDATE personne SET ";
  sql += "Nom = ? WHERE IdPersonne = ?";
  db.run(sql, [params[2], params[3]]);
};
