const sqlite3 = require('sqlite3').verbose();
const config = require('./config')

let db = new sqlite3.Database(config.database_path, sqlite3.OPEN_READWRITE, function(err) {
    if (err) {
      console.error("db connection error:",err.message);
    }
    else{
      createTables();
      console.log('Connected to the userrecord database.');
      
    }
  
});

function createTables(){
    
    db.run("CREATE TABLE if not exists user_info (user_id TEXT PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, email text  NOT NULL, gender text NOT NULL, city text NOT NULL, skills text NOT NULL, imageName text NOT NULL)");
    db.run("CREATE TABLE if not exists city_master (city_id TEXT PRIMARY KEY, cityname TEXT NOT NULL)");
    db.run("CREATE TABLE if not exists skill_master (skill_id TEXT PRIMARY KEY, skillname TEXT NOT NULL)");
   // db.run('CREATE TABLE if not exists file_ids (username TEXT NOT NULL, file_id text NOT NULL, slug text NOT NULL)');
}

module.exports = {
    db
}