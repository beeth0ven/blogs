
import crypto from "crypto";
import jwt from "jsonwebtoken";
import jwtSecret from "./configSecret";

const createSaltedPassHash = (password) => {
  const saltedPassword = password+'pubApp';
  return crypto
    .createHash('sha256')
    .update(saltedPassword)
    .digest('hex');
};

const createToken = (username, role) => {
  const userDetailsToHash = username+role;
  return jwt.sign(userDetailsToHash, jwtSecret.secret);
};

const validToken = (token, username, role) => {
  const authSignToken = createToken(username, role);
  return authSignToken === token;
};

export {createSaltedPassHash, createToken, validToken};