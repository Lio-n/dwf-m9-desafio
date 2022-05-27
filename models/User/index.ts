import { firestore } from "lib";

type UserData = {
  created_at: Date;
  orders_generated: string[]; // Cada vez que se completa una orden, la coll Order debe actualizar este campo.
  // * ↓ Estas propiedades son posibles actulizar por el user.
  full_name: string;
  email: string;
  address: string;
  avatar_picture: string; // url : base64
};
const collection = firestore.collection("user");
class User {
  ref: FirebaseFirestore.DocumentReference;
  data: UserData;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as UserData;
  }
  async push() {
    this.ref.update(this.data);
  }
  setData(newData) {
    this.data = { ...newData };
  }
  async saveOrderGenerated({ order_id }) {
    await this.pull();
    this.data.orders_generated.push(order_id);
    this.push();
  }
  static async createNewUser({ email }: { email: string }): Promise<User> {
    try {
      const cleanEmail = email.trim().toLocaleLowerCase();
      const userBase = {
        email: cleanEmail,
        created_at: new Date(),
        orders_generated: [],
        full_name: "",
        address: "",
        avatar_picture: "",
      };
      const newUserSnap = await collection.add(userBase);

      const newUser = new User(newUserSnap.id);
      newUser.data = userBase;

      return newUser;
    } catch (err) {
      console.error(err);
    }
  }
}
export default User;
