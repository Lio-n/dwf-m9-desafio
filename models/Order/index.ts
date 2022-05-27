import { firestore } from "lib";

const collection = firestore.collection("order");
type OrderData = {
  status: "paid" | "pending" | "cancelled";
  additional_info: object;
  product_id: string;
  user_id: string;
  created_at: Date;
  price_per_unit: number;
  quantity: number;
  total_cost: number;
};
class Order {
  ref: FirebaseFirestore.DocumentReference;
  data: OrderData;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as OrderData;
    return this.data;
  }
  async push() {
    this.ref.update(this.data);
  }

  static async createNewOrder({ additionalInfo = {}, productId, userId }: GenerateOrderParams) {
    const orderBase = {
      status: "pending",
      additional_info: additionalInfo,
      product_id: productId,
      user_id: userId,
      created_at: new Date(),
      price_per_unit: "",
      quantity: "",
      total_cost: "",
    };
    const newOrderSnap = await collection.add(orderBase);
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
