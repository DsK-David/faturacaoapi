// export function createDateFromFormat(dateString) {
//   const [year, month, day, hours, minutes, seconds] = dateString
//     .split("-")
//     .concat(dateString.slice(-8).split(":"));
//   return new Date(year, month - 1, day, hours, minutes, seconds);
// }

// Exemplo de uso:
// const dateObject = createDateFromFormat("2022-11-10 11:28:40");
// console.log(dateObject);
export function createDateFromFormat(dateObject) {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}