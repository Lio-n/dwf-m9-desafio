import { firestore } from "lib";
import Base from "models/base_class";

const coll = firestore.collection("user");
class User extends Base {
  constructor(id: string) {
    super({ id, ref: coll.doc(id) });
  }
  async saveOrderGenerated(order_id: string) {
    await this.pull();
    this.data.orders_generated.push(order_id);
    this.push();
  }
  static async createNewUser(email: string): Promise<User> {
    const cleanEmail = this.cleanEmail(email);

    // * 'userBase' : representa la estructura de cada User
    const userBase = {
      email: cleanEmail,
      created_at: new Date(),
      orders_generated: [],
      full_name: "",
      address: "",
      avatar_picture: "",
    };

    const newUserSnap = await coll.add(userBase);

    const newUser = new User(newUserSnap.id);
    newUser.data = userBase;

    return newUser;
  }
}
export default User;
