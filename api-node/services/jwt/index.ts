import jwt from 'jsonwebtoken';

interface Claims extends jwt.JwtPayload {
  username: string;
  password: string;
  email: string;
}

const secret = process.env.U_SECRET as string;

export function createToken(username: string, email: string): string {
  const token = jwt.sign({ username, email }, secret, { algorithm: 'HS256' });
  return token;
}

export function parseToken(accessToken: string): { username: string, email: string } | null {
  try {
    const decoded = jwt.verify(accessToken, secret) as Claims;
    return { username: decoded.username, email: decoded.email };
  } catch (err) {
    return null;
  }
}
