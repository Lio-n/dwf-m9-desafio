import { NextApiRequest, NextApiResponse } from "next";
type schemaMiddlewareParams = {
  schema;
  callback;
  request: "body" | "query";
};

export const schemaMiddleware = ({ schema, callback, request }: schemaMiddlewareParams) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const search = request == "body" ? req.body : req.query;

      const result = await schema.validate(search);
      callback(res, result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};
