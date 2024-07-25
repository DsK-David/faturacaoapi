import bcrypt from "bcrypt";
import database from "../database/database.js";

// export async function auth(username, password) {
//   try {
//     console.log("Consultando usuário:", username);

//     // Tenta encontrar um usuário com o nome de usuário fornecido
//     const userResult = await database
//       .select()
//       .from("glb_user")
//       .where("USERNAME", username);

//     console.log("Resultado da consulta:", userResult);

//     if (userResult.length > 0) {
//       const storedHash = userResult[0].PASSWORD;
//       console.log("Hash armazenado:", storedHash);

//       // Compara a senha fornecida com o hash armazenado
//       const match = await bcrypt.compare(password, storedHash);
//       console.log("Comparação da senha:", match);

//       if (match) {
//         // A senha está correta
//         return true;
//       } else {
//         // A senha está incorreta
//         return false;
//       }
//     } else {
//       // Usuário não encontrado
//       return false;
//     }
//   } catch (error) {
//     console.error("Erro durante a autenticação:", error);
//     return false;
//   }
// }
export async function auth(username,password){
   return database.select().from("glb_user").where("USERNAME", username).where("CODIGO",password);
}