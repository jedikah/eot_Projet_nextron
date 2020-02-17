export const selectSettings = (db, params, cb) => {
  let sql = "SELECT ";
  sql += "setting.NumSetting AS NumSetting,";
  sql += "setting.IdUser AS IdUser,";
  sql += "setting.NameSetting AS NameSetting,";
  sql += "setting.Value AS Value ";
  sql += "FROM setting WHERE IdUser = ?";

  db.all(sql, params, (err, rows) => {
    console.log({ params });
    cb(rows);
  });
};
