export const selectUsers = (db, cb) => {
  let sql = "SELECT ";
  sql += "user.IdUser AS id,";
  sql += "user.IdPersonne AS idpers,";
  sql += "personne.Nom AS name,";
  sql += "user.PassWord AS passWd ";
  sql += "FROM ";
  sql += "user ";
  sql += "INNER JOIN personne ON user.IdPersonne = personne.IdPersonne";

  let select = "";

  //select = Promise((resolve, reject) => {
  db.all(sql, (err, rows) => {
    cb(rows);
  });
};
