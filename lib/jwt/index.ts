import * as jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface JwtPayload {
  userId: string;
}

const generateToken = (userId: string): string => {
  // * JWT: Generates token
  return jwt.sign({ userId }, JWT_SECRET);
};

const decodeToken = (token: string): string | null => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return userId;
  } catch (err) {
    throw "Token incorrecto";
  }
};

export { decodeToken, generateToken };
