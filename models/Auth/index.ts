import { firestore, generateToken } from "lib";
import { isAfter } from "date-fns";

const collection = firestore.collection("auth");
class Auth {
  ref: FirebaseFirestore.DocumentReference;
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
  setData(newData) {
    this.data = { ...newData };
  }
  static cleanEmail({ email }: { email: string }) {
    return email.trim().toLocaleLowerCase();
  }
  static async findByEmail({ email }: { email: string }): Promise<null | Auth> {
    const cleanEmail = this.cleanEmail({ email });
    const results = await collection.where("email", "==", cleanEmail).get();

    if (!results.docs.length) return null;

    const first = results.docs[0];
    const newAuth = new Auth(first.id);
    newAuth.data = { ...first.data() };
    return newAuth;
  }
  static async findByEmailAndCode({
    email,
    code,
  }: {
    email: string;
    code: number;
  }): Promise<{ token }> {
    const auth = await this.findByEmail({ email });

    if (!auth) throw "El email no esta registrado";
    if (auth.data.code !== code) throw "El codigo no es valido";
    if (isAfter(new Date(), auth.data.expires.toDate())) throw "El tiempo ha expirado";

    const token = generateToken({ userId: auth.data.userId });
    return { token };
  }
  static async createNewAuth({ email, userId }: { email: string; userId: string }): Promise<Auth> {
    const cleanEmail = this.cleanEmail({ email });
    const newAuthSnap = await collection.add({ email: cleanEmail, userId });
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = { email };
    return newAuth;
  }
}

export default Auth;
