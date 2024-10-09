export function generateUniqueNumber() {
  let usedNumbers = [];
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 100000);
  } while (usedNumbers.includes(randomNumber));

  return randomNumber.toString().padStart(5, "0");
}

// Exemplo de uso:
console.log(generateUniqueNumber());
