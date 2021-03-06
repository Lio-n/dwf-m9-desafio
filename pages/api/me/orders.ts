import { getOrdersFromUser } from "controllers";
import methods from "micro-method-router";
import { authMiddleware } from "middleware";

/*  
  $ GET /me/orders
  # Devuelve todas mis ordenes con sus status.
*/
const getOrder = async ({ res, userId }: CustomEndpointWithoutReq) => {
  try {
    const orders = await getOrdersFromUser(userId);
    res.status(200).json({ orders });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export default methods({
  get: authMiddleware(getOrder),
});
