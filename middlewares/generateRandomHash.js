import crypto from "crypto"

export function generateRandomHashId() {
  return crypto.randomBytes(16).toString("hex");
}
