export const selectTravaux = db => {
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

  let select = {
    travaux: []
  };

  db.each(sql, (err, row) => {
    select.travaux.push(row);
  });
  return select;
};
