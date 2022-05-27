import { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "controllers";
const methods = require("micro-method-router");

// $ GET /products/{id}
// # Obtiene toda data de un producto.
const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const product = await getProductById(id as string);

    res.status(200).json({ product });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export default methods({
  get: getProduct,
});
