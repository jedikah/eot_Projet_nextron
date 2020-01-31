export const selectUsers = db => {
  let sql = "SELECT ";
  sql += "user.IdUser AS id,";
  sql += "user.IdPersonne AS idpers,";
  sql += "personne.Nom AS name,";
  sql += "user.PassWord AS passWd ";
  sql += "FROM ";
  sql += "user ";
  sql += "INNER JOIN personne ON user.IdPersonne = personne.IdPersonne";

  let select = {
    users: []
  };

  db.each(sql, (err, row) => {
    select.users.push(row);
  });

  return select;
};
