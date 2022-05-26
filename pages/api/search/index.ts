import { NextApiRequest, NextApiResponse } from "next";
import { getProductsByLimitAndOffset } from "controllers";
const methods = require("micro-method-router");

// $ GET /search?q=query&offset=0&limit=10
// # Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario.
// # Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // $ offSet = el tamaño del registro más el limit.
    const { limit, offset, q } = req.query;

    if (!q) throw "q is a required field";

    const { hits, nbHits, newLimit, newOffset } = await getProductsByLimitAndOffset({
      limit,
      offset,
      query: q,
    });

    res.status(200).json({
      results: hits,
      pagínation: {
        limit: newLimit,
        offset: newOffset,
        total: nbHits,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default methods({
  get: getProducts,
});
