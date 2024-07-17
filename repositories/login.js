import database from "../database/database.js";

export async function auth(username,password){
    return database.select().from("glb_user").where("USERNAME",username).where("CODIGO",password)

}
// export async function auth(username) {
//   return database
//     .select()
//     .from("glb_user")
//     .where("USERNAME", username)
//     // .where("PASSWORD", password);
// }