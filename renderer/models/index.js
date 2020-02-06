export * from "./user";
export * from "./client";
export * from "./lettreCharghe";
export * from "./travau";
export * from "./personne";
export * from "./convocation";

const fs = require("fs");

export const testPath = path => {
  fs.exists(path, exists => {
    console.log("file exists ? " + exists);
    //if(exist) fs.mkdir()
  });
};

export const homeDir = dir => {
  const osHomedir = require("os-homedir");
  let homeDir = "";
  for (let i = 0; i < osHomedir().length; i++) {
    let char = osHomedir()[i];
    if (char === "\\") char = "/";
    homeDir += char;
  }
  homeDir += "/" + dir + "/";

  if (!fs.existsSync(homeDir)) fs.mkdirSync(homeDir);
  return homeDir;
};

export const connect = path => {
  const sqlite3 = require("sqlite3").verbose();
  sqlite3.OPEN_READWRITE;
  if (!fs.existsSync(path)) {
    var db = new sqlite3.Database(path);
    createDB(db);
  } else var db = new sqlite3.Database(path);
  return db;
};

export const createDB = db => {
  db.serialize(function() {
    drop(db);
    client(db);
    convocation(db);
    facture(db);
    lettrecharge(db);
    personne(db);
    PV(db);
    setting(db);
    travau(db);
    user(db);
    INDEX(db);
  });

  db.close();
};

const drop = db => {
  db.run("PRAGMA foreign_keys = off;");
  db.run("BEGIN TRANSACTION;");

  db.run("DROP TABLE IF EXISTS client;");
  db.run("DROP TABLE IF EXISTS convocation");
  db.run("DROP TABLE IF EXISTS facture;");
  db.run("DROP TABLE IF EXISTS lettrecharge;");
  db.run("DROP TABLE IF EXISTS personne;");
  db.run("DROP TABLE IF EXISTS pv;");
  db.run("DROP TABLE IF EXISTS setting;");
  db.run("DROP TABLE IF EXISTS travau;");
  db.run("DROP TABLE IF EXISTS user;");
};
const client = db => {
  let sql = "CREATE TABLE client (";
  sql += "IdCli      INTEGER   NOT NULL,";
  sql += "IdPersonne INTEGER   NOT NULL,";
  sql += "Domicile   TEXT (20) NOT NULL,";
  sql += "Contact    TEXT (10) NOT NULL,";
  sql += "PRIMARY KEY (";
  sql += "IdCli";
  sql += "),";
  sql += "CONSTRAINT IdClient UNIQUE ( ";
  sql += "IdCli ASC";
  sql += "));";
  db.run(sql);
};

const convocation = db => {
  let sql = "CREATE TABLE convocation (";
  sql += "NumRegistre INTEGER  ,";
  sql += "IdTrav      INTEGER  ,";
  sql += "NomPersConv TEXT (25),";
  sql += "DateConv    TEXT (10),";
  sql += "VilleConv   TEXT (15),";
  sql += "HeureConv   TEXT (5) ,";
  sql += "PRIMARY KEY (";
  sql += "NumRegistre ASC";
  sql += "));";
  db.run(sql);
};

const facture = db => {
  let sql = "CREATE TABLE facture (";
  sql += "IdFact   INTEGER   NOT NULL,";
  sql += "IdClient INTEGER   NOT NULL,";
  sql += "DateFact TEXT (10) NOT NULL,";
  sql += "PRIMARY KEY (";
  sql += "IdFact ASC";
  sql += "),";
  sql += "CONSTRAINT IdFact UNIQUE (";
  sql += "IdFact ASC";
  sql += "));";
  db.run(sql);
};

const lettrecharge = db => {
  let sql = "CREATE TABLE lettrecharge (";
  sql += "IdLC    INTEGER ,";
  sql += "NumRTX  TEXT (7) ,";
  sql += "IdTrav  INTEGER  ,";
  sql += "DateRTX TEXT (10),";
  sql += "VilleL  TEXT (15),";
  sql += "DateL   TEXT (10),";
  sql += "Objet   TEXT (80),";
  sql += "PRIMARY KEY (";
  sql += "IdLC ASC";
  sql += "))";
  db.run(sql);
};

const personne = db => {
  let sql = "CREATE TABLE personne (";
  sql += "IdPersonne INTEGER   NOT NULL,";
  sql += "Nom        TEXT (25) NOT NULL,";
  sql += "PRIMARY KEY (";
  sql += "IdPersonne ASC";
  sql += "),";
  sql += "CONSTRAINT IdPersonne UNIQUE (";
  sql += "IdPersonne ASC";
  sql += "),";
  sql += "CONSTRAINT Nom UNIQUE (";
  sql += "IdPersonne ASC";
  sql += "));";
  db.run(sql);

  sql = "INSERT INTO personne (";
  sql += "IdPersonne,";
  sql += "Nom";
  sql += ")";
  sql += "VALUES (";
  sql += "1,";
  sql += "'admin'";
  sql += ");";
  db.run(sql);
};

const PV = db => {
  let sql = "CREATE TABLE pv (";
  sql += "NumPV           INTEGER   NOT NULL,";
  sql += "PieceJust       TEXT (300),";
  sql += "Commune         TEXT (15),";
  sql += "District        TEXT (15),";
  sql += "Region          TEXT (15),";
  sql += "PRIMARY KEY (";
  sql += "NumPV ASC";
  sql += "),";
  sql += "CONSTRAINT NumPV UNIQUE (";
  sql += "NumPV ASC";
  sql += " ));";
  db.run(sql);
};

const setting = db => {
  let sql = "CREATE TABLE setting (";
  sql += "NumSetting  INTEGER   NOT NULL,";
  sql += "IdUser      TEXT (15) NOT NULL,";
  sql += "NameSetting TEXT (15) NOT NULL,";
  sql += "Value       TEXT,";
  sql += "PRIMARY KEY (";
  sql += "NumSetting";
  sql += "),";
  sql += "CONSTRAINT NumSetting UNIQUE (";
  sql += "NumSetting ASC";
  sql += "));";
  db.run(sql);
};

const travau = db => {
  let sql = "CREATE TABLE travau (";
  sql += "IdTrav           INTEGER   NOT NULL,";
  sql += "IdCli            INTEGER   NOT NULL,";
  sql += "IdFact           INTEGER   DEFAULT NULL,";
  sql += "NumReq           TEXT (7)  DEFAULT NULL,";
  sql += "NumTitre         TEXT (7)  DEFAULT NULL,";
  sql += "NomTer           TEXT (30) DEFAULT NULL,";
  sql += "LocalisationTrav TEXT (20) DEFAULT NULL,";
  sql += "Fokontany        TEXT (15) DEFAULT NULL,";
  sql += "DateTrav         TEXT      DEFAULT NULL,";
  sql += "TypeTrav         TEXT (40) NOT NULL,";
  sql += "Prix             INTEGER   DEFAULT NULL,";
  sql += " PRIMARY KEY (";
  sql += "IdTrav";
  sql += "),";
  sql += "CONSTRAINT IdTrav UNIQUE (";
  sql += "IdTrav";
  sql += "));";
  db.run(sql);
};

const user = db => {
  let sql = "CREATE TABLE user (";
  sql += "IdUser     INTEGER NOT NULL,";
  sql += "IdPersonne INTEGER   NOT NULL,";
  sql += "PassWord   TEXT (15) NOT NULL,";
  sql += "PRIMARY KEY (";
  sql += "IdUser";
  sql += "),";
  sql += "CONSTRAINT IdUser UNIQUE (";
  sql += "IdUser";
  sql += "),";
  sql += "CONSTRAINT user_IdPersonne UNIQUE (";
  sql += "IdPersonne";
  sql += "));";
  db.run(sql);

  sql = "INSERT INTO user (";
  sql += "IdUser,";
  sql += "PassWord,";
  sql += "IdPersonne";
  sql += ")";
  sql += "VALUES (1,";
  sql += "'admin',";
  sql += "1  );";
  db.run(sql);
};

const INDEX = db => {
  //-- Index :
  db.run('DROP INDEX IF EXISTS "";');
  let sql = 'CREATE INDEX "" ON lettrecharge (';
  sql += '"IdTrav" ASC);';
  db.run(sql);
  //-- Index : client_IdPersonne
  db.run("DROP INDEX IF EXISTS client_IdPersonne;");
  sql = "CREATE UNIQUE INDEX client_IdPersonne ON client (";
  sql += '"IdPersonne" ASC  );';
  db.run(sql);
  //-- Index : convocation_IdTrav
  db.run("DROP INDEX IF EXISTS convocation_IdTrav;");
  sql = "CREATE INDEX convocation_IdTrav ON convocation (";
  sql += '"IdTrav" ASC    );';
  db.run(sql);
  //-- Index : facture_IdClient
  db.run("DROP INDEX IF EXISTS facture_IdClient;");
  sql = "CREATE INDEX facture_IdClient ON facture (";
  sql += '"IdClient" ASC    );';
  db.run(sql);
  //-- Index : setting_IdUser
  db.run("DROP INDEX IF EXISTS setting_IdUser;");
  sql = "CREATE INDEX setting_IdUser ON setting (";
  sql += '"IdUser" ASC      );';
  db.run(sql);
  //-- Index : travau_IdCli
  db.run("DROP INDEX IF EXISTS travau_IdCli;");
  sql = "CREATE INDEX travau_IdCli ON travau (";
  sql += '"IdCli" ASC        );';
  db.run(sql);
  //-- Index : travau_IdFact
  db.run("DROP INDEX IF EXISTS travau_IdFact;");
  sql = "CREATE INDEX travau_IdFact ON travau (";
  sql += '"IdFact" ASC          );';
  db.run(sql);
  //-- Index : user_IdPersonne
  db.run("DROP INDEX IF EXISTS user_IdPersonne;");
  sql = "CREATE UNIQUE INDEX user_IdPersonne ON user (";
  ('"IdPersonne" ASC            );');
  db.run(sql);

  db.run("COMMIT TRANSACTION;");
  db.run("PRAGMA foreign_keys = on;");
};
