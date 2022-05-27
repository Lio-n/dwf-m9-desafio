import * as jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const generateToken = (userId: string): string => {
  // * JWT: Generates token
  return jwt.sign({ userId }, JWT_SECRET);
};

const decodeToken = (token: string): string | null => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  } catch (err) {
    return null;
  }
};

export { decodeToken, generateToken };
