import { firestore } from "lib";
import Base from "models/base_class";

const coll = firestore.collection("order");
class Order extends Base {
  constructor(id: string) {
    super({ id, ref: coll.doc(id) });
  }
  static async validateOrderId(order_id) {
    const doc = await coll.doc(order_id).get();
    if (!doc.exists) throw "orderId does not exist";
  }

  static async createNewOrder({ additionalInfo = {}, productId, userId }: GenerateOrderParams) {
    // * 'orderBase' : representa la estructura de cada Order
    const orderBase: OrderData = {
      status: "pending",
      additional_info: additionalInfo,
      product_id: productId,
      user_id: userId,
      created_at: new Date(),
      price_per_unit: null,
      quantity: null,
      total_cost: null,
    };
    const newOrderSnap = await coll.add(orderBase);
    // * El span no contiene la data solo el Id.
    return newOrderSnap.id;
  }

  async setOrderAsPaid() {
    await this.pull();
    this.data.status = "paid";
    this.push();
  }
}

export default Order;
