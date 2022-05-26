import methods from "micro-method-router";
import { authMiddleware } from "middleware";
import { generateOrder } from "controllers";

// $ POST /order?productId={id}
// # Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago.
// # Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId.
// * chequea el token y recupera la data del user de la db
// * opcionalmente, data extra sobre esta compra en el body [...color, detalles de envío]
const postOrder = async ({ req, res, userId }: CustomEndpoint) => {
  try {
    const productId = req.query.productId as string;
    if (!productId) throw "productId is a required field";

    const init_point = await generateOrder({
      additionalInfo: req.body,
      productId,
      userId,
    });

    res.status(200).json({ init_point });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export default methods({
  post: authMiddleware(postOrder),
});
