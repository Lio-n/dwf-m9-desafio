import methods from "micro-method-router";
import { generateOrder } from "controllers";

// ! Falta
// $ GET /order/{orderId}
// # Devuelve una orden con toda la data incluyendo el estado de la orden.
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
