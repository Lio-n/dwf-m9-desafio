import { firestore } from "lib";

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

  static async createNewUser({ email }: { email: string }): Promise<User> {
    const cleanEmail = email.trim().toLocaleLowerCase();
    const newUserSnap = await collection.add({ email: cleanEmail });
    const newUser = new User(newUserSnap.id);
    newUser.data = { email };
    return newUser;
  }
}
export default User;
