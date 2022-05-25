import { firestore } from "lib";

type UserData = {
  code: number;
  createdAt: Date;
  // ToDo : Cada vez que se completa una orden, la coll Order debe actualizar este campo.
  purchased_products: string[]; // Almacena los ids de las Order que realizo
  // * ↓ Estas propiedades son posibles actulizar por el user.
  full_name: string;
  email: string;
  address: string;
  avatar_picture: string; // url : base64
};
const collection = firestore.collection("user");
class User {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string; // el Id de firestore es un string
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
  setData(newData) {
    this.data = { ...newData };
  }

  static async createNewUser({ email }: { email: string }): Promise<User> {
    const cleanEmail = email.trim().toLocaleLowerCase();
    const createdAt = new Date();
    const newUserSnap = await collection.add({ email: cleanEmail, createdAt });
    const newUser = new User(newUserSnap.id);
    newUser.data = { email, createdAt };
    return newUser;
  }
}
export default User;
