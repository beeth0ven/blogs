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
  return jsonWebToken.sign(tokenInfo, secret, { expiresIn: 24 * 3600 })
};

const verifyToken = (bearerToken) => {
  const [_, schema, parsedToken] = bearerToken.match(/^(\S+)\s+(\S+)$/);
  return jsonWebToken.verify(parsedToken, secret);
};

export { createSaltedPassword, createToken, verifyToken };