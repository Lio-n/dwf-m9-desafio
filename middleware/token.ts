import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decodeToken } from "lib";

export const authMiddleware = (callback) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = parseBearerToken(req);

      if (!token) throw "No hay token";

      const decodedToken = decodeToken({ token });

      if (!decodedToken) throw "Token incorrecto";

      if (decodedToken) callback(res, decodedToken);
    } catch (err) {
      res.status(401).json({ message: err });
    }
  };
};
