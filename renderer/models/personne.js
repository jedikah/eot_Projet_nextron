const addPersone = db => {};

export const updatePersonne = (db, params, cb) => {
  let sql = "UPDATE personne SET ";
  sql += "Nom = ? WHERE IdPersonne = ?";
  db.run(sql, params[0], params[1]);
};
