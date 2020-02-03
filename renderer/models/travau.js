export const selectTravaux = (db, cb) => {
  let sql = "SELECT ";
  sql += "travau.IdTrav AS IdTrav,";
  sql += "personne.Nom AS Nom,";
  sql += "travau.NumTitre AS NumTitre,";
  sql += "travau.NomTer AS NomTer,";
  sql += "travau.LocalisationTrav AS LoacalisationTrav,";
  sql += "travau.Fokontany AS Fokontany,";
  sql += "travau.DateTrav AS DateTrav,";
  sql += "travau.TypeTrav AS TypeTrav,";
  sql += "travau.Prix AS Prix ";
  sql += "FROM ";
  sql += "travau ,";
  sql += "personne ";
  sql += "INNER JOIN client ON personne.IdPersonne = client.IdPersonne ";
  sql += "AND client.IdCli = travau.IdCli";

  db.all(sql, (err, rows) => cb(rows));
};
