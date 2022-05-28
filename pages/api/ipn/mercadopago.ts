import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { setPurchaseAsConfirmed } from "controllers";

// $ POST /ipn/mercadopago
// # Recibe la señal de MercadoPago para confirmar que el pago fué realizado con éxito.
// # Cambia el estado de la compra en nuestra base y le envía un email al usuario para avisarle
// # que el pago se realizó correctamente. También se debe generar algún aviso hacia quienes deban
// # procesar esta compra. Esto último es algo interno así que puede ser un email o un registro en Airtable.

const postIpn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, topic } = req.query;

    if (topic == "merchant_order") {
      await setPurchaseAsConfirmed(id as string);

      res.status(200).json({ message: "Todo ok" });
    } else {
      res.status(200).json({ req: req.query });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default methods({
  post: postIpn,
});
