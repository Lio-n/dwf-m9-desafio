import methods from "micro-method-router";
import { getOneOrder } from "controllers";
import { NextApiRequest, NextApiResponse } from "next";

/*  
  $ GET /order/{orderId}
  # Devuelve una orden con toda la data incluyendo el estado de la orden.
*/
const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { orderId } = req.query;

    const order = await getOneOrder(orderId as string);

    res.status(200).json({ order });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export default methods({
  get: getOrder,
});
