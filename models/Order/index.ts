import { firestore } from "lib";

const collection = firestore.collection("order");

class Order {
  ref: FirebaseFirestore.DocumentReference;
  // data: {productId:number,userdId:number,state_order:["paid","unpaid"]};
  data: any;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }

  static async createNewOrder({ additionalInfo = {}, productId, userId }: GenerateOrderParams) {
    const newOrderSnap = await collection.add({
      additionalInfo,
      productId,
      userId,
      order_status: "unpaid",
    });
    // * El span no contiene la data solo el Id.
    return newOrderSnap.id;
  }

  async setOrderAsPaid() {
    await this.pull();
    this.data.order_status = "paid";
    this.push();
  }
}

export default Order;
