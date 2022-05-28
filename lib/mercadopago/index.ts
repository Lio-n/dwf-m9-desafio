import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

const getMerchantOrder = async (id: string): Promise<string> => {
  const res = await mercadopago.merchant_orders.get(id);
  const { external_reference } = res.response;

  return external_reference;
};

const createPreference = async (data: MPPreference): Promise<string> => {
  try {
    const res = await mercadopago.preferences.create(data);
    const { init_point } = res.response;

    return init_point;
  } catch (err) {
    throw err;
  }
};

export { createPreference, getMerchantOrder };
