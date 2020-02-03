export const selectClients = db => {
  let sql = "SELECT ";
  sql += "client.IdCli AS IdCli,";
  sql += "client.IdPersonne AS IdPersonne,";
  sql += "personne.Nom AS Nom,";
  sql += "client.Domicile AS Domicile,";
  sql += "client.Contact AS Contact ";
  sql += "FROM ";
  sql += "client ";
  sql += "INNER JOIN personne ON personne.IdPersonne = client.IdPersonne";

  let select = "";
  db.each(sql, (err, row) => {
    select.clie;
  });

  return select;
};
