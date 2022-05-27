import { getProductById, setOrderGenerated } from "controllers";
import { createPreference } from "lib";
import { Order } from "models";

const generateOrder = async ({
  additionalInfo,
  productId,
  userId,
}: GenerateOrderParams): Promise<string> => {
  const promiseOrder = Order.createNewOrder({ additionalInfo, productId, userId });
  const promiseProduct = getProductById(productId);

  const [order_id, product] = await Promise.all([promiseOrder, promiseProduct]);
  setOrderGenerated({ order_id, userId }); // Guardo en User las ordenes generadas

  // * Elimino la propiedad 'description' del producto porque la API de MP me genera este error.
  // * Error: The next fields are failing on validation: ".items[0].description": should NOT be longer than 256 characters.
  delete product.description;

  const data = {
    items: [product],
    back_urls: {
      success: "url_pago_aprobado",
      pending: "url_pago_pendiente",
      failure: "url_pago_cancelado",
    },
    external_reference: order_id,
    notification_url: "https://pagos-testing-mp.vercel.app/api/webhooks/mercadopago",
  };

  return await createPreference(data);
};

const getOrders = async (orders) => {
  const arrOrders = orders.map((order_id, index) => {
    index = new Order(order_id);
    return index.pull();
  });

  const results = await Promise.all(arrOrders);
  return results;
};
export { generateOrder, getOrders };
