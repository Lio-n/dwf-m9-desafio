import { getProductById, setOrderGenerated } from "controllers";
import { createPreference, getMerchantOrder, sendConfirmEmail } from "lib";
import { Order, User } from "models";

const generateOrder = async ({
  additionalInfo,
  productId,
  userId,
}: GenerateOrderParams): Promise<string> => {
  const product = await getProductById(productId);
  const order_id = await Order.createNewOrder({ additionalInfo, productId, userId });

  setOrderGenerated({ order_id, userId }); // Guardo en User las ordenes generadas

  /*
   * Elimino la propiedad 'description' del producto porque la API de MP me genera este error.
   * Error: The next fields are failing on validation: ".items[0].description": should NOT be longer than 256 characters.
   */
  delete product.description;

  const data = {
    items: [product],
    back_urls: {
      success: "url_pago_aprobado",
      pending: "url_pago_pendiente",
      failure: "url_pago_cancelado",
    },
    external_reference: order_id,
    notification_url: "https://dwf-m9-desafio.vercel.app/api/ipn/mercadopago",
  };

  return await createPreference(data); // Return : URL para realizar el pago
};

const getOrders = async (orders: string[]): Promise<OrderData[] | []> => {
  const arrOrders = orders.map((order_id) => {
    const order = new Order(order_id);
    return order.pull();
  });

  const results = await Promise.all(arrOrders);
  return results;
};

const getOneOrder = async (order_id: string): Promise<OrderData> => {
  await Order.validateOrderId(order_id);

  const order = new Order(order_id);
  await order.pull();
  return order.data;
};

const setPurchaseAsConfirmed = async (id: string) => {
  const order_id = await getMerchantOrder(id);

  const order = new Order(order_id);
  await order.setOrderAsPaid();

  const user = new User(order.data.user_id);
  await user.pull();

  await sendConfirmEmail(user.data.email);
};
export { generateOrder, getOrders, getOneOrder, setPurchaseAsConfirmed };
