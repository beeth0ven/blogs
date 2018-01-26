import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import {secret} from "./config";

const createSaltedPassword = (password) => {
  const saltedPassword = `${password}pubApp`;
  return crypto
    .createHash('sha256')
    .update(saltedPassword)
    .digest('hex');
};

const createToken = (username, role) => {
  const tokenInfo = { username, role };
  return jsonWebToken.sign(tokenInfo, secret)
};

const validToken = (username, role, token) => {
  const correct = createToken(username, role);
  return token === correct;
};

const decodeToken = (token) => {
  return jsonWebToken.decode(token, secret)
};

export { createSaltedPassword, createToken, validToken, decodeToken };