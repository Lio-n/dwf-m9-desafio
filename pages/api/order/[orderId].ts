import methods from "micro-method-router";
import { generateOrder } from "controllers";

// $ GET /me/orders
// # Devuelve todas mis ordenes con sus status.
const getOrder = async ({ req, res, userId }: CustomEndpoint) => {
  try {
    const { orderId } = req.query;
    const init_point = await generateOrder({
      additionalInfo: req.body,
      productId: orderId,
      userId,
    });

    res.status(200).json({ init_point });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export default methods({
  post: getOrder,
});
