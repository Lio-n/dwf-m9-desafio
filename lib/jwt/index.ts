import * as jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const generateToken = ({ userId }: { userId: string }): string => {
  // * JWT: Generates token
  return jwt.sign({ userId }, JWT_SECRET);
};

const decodeToken = ({ token }: { token: string }): object | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Token Incorrecto");
    return null;
  }
};

export { decodeToken, generateToken };