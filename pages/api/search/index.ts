import { NextApiResponse } from "next";
import { getProductsByLimitAndOffset } from "controllers";
import methods from "micro-method-router";
import * as yup from "yup";
import { schemaMiddleware } from "middleware";

/*  
  $ GET /search?q=query&offset=0&limit=10
  # Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario.
  # Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.
*/
const querySchema = yup.object().shape({
  limit: yup.number(),
  offset: yup.number(),
  q: yup.string(),
});
const getProducts = async (res: NextApiResponse, { limit, offset, q }) => {
  try {
    // offSet = el tamaño del registro más el limit.

    const { hits, nbHits, newLimit, newOffset } = await getProductsByLimitAndOffset({
      limit,
      offset,
      query: q,
    });

    res.status(200).json({
      results: hits,
      pagination: {
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
  get: schemaMiddleware({ schema: querySchema, callback: getProducts, request: "query" }),
});
