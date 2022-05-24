import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decodeToken } from "lib";

export const authMiddleware = (callback) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = parseBearerToken(req);

    if (!token) res.status(401).json({ message: "No hay token" });

    const decodedToken = decodeToken({ token });

    if (!decodedToken) res.status(401).json({ message: "Token incorrecto" });

    if (decodedToken) callback(res, decodedToken);
  };
};
