import jwt, { JwtPayload } from 'jsonwebtoken';
import { toHexString } from '../Parsers';
import { randomBytes } from 'crypto';
import { fqdn } from '../../config/server';

const JWT_KEY = process.env.JWT_KEY;
let SECRET_KEY = toHexString(randomBytes(22));
if (JWT_KEY) {
  SECRET_KEY = JWT_KEY;
}

export interface jwtPayload {
  id: string;
  usr: string;
  iss: string;
  sub: string;
  nbs: number;
  exp: number;
  iat: number;
  adm: boolean;
  chn: 'BSC' | 'ETH' | 'MRX';
}

export function createToken(
  id: string,
  account: string,
  admin: boolean,
  chain: 'BSC' | 'ETH' | 'MRX'
) {
  const timestamp = Math.floor(Date.now() / 1000);
  /* Create JWT Payload */
  const payload: JwtPayload = {
    id,
    usr: account,
    iss: fqdn,
    sub: 'auth',
    nbs: timestamp - 100,
    exp: timestamp + 3600, // 1 hour in seconds
    iat: timestamp,
    adm: admin,
    chn: chain
  } as jwtPayload;
  /* Sign token */
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

export function verifyToken(jwtToken: string): jwtPayload | undefined {
  try {
    return jwt.verify(jwtToken, SECRET_KEY) as jwtPayload;
  } catch (e) {
    //console.log('e:', e);
    return undefined;
  }
}

export const signatureMessage = 'Welcome Traveler --SIGN ACK--\n';
