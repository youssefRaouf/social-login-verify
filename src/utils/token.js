import {verify, sign} from 'jsonwebtoken';

export const TOKEN_EXPIRATION = '360d';


export const signJWT = (uid) =>
  sign({uid}, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION
  });

export const verifyJWT = (token) =>
  verify(token, process.env.JWT_SECRET);
