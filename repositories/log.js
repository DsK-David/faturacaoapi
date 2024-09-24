import database from "../database/database.js";
export function adicionarLog(timestamp,level,message){
return database("log")
  .insert({
    time_stamps: timestamp,
    level: level,
    message:message
  })
}