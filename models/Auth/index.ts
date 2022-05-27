import { firestore, generateToken } from "lib";
import { fromUnixTime, isAfter } from "date-fns";

const collection = firestore.collection("auth");
type AuthData = {
  email: string;
  user_id: string;
  code: number;
  expires: Date;
};
class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: AuthData;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as AuthData;
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
    newAuth.data = { ...first.data() } as AuthData;
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
    if (isAfter(new Date(), fromUnixTime(auth.data.expires["_seconds"])))
      throw "El tiempo ha expirado";

    const token = generateToken(auth.data.user_id);
    return { token };
  }
  static async createNewAuth({ email, userId }: { email: string; userId: string }): Promise<Auth> {
    const cleanEmail = this.cleanEmail({ email });
    const authBase = {
      email,
      user_id: userId,
      code: null,
      expires: null,
    };
    const newAuthSnap = await collection.add(authBase);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = { email } as AuthData;
    return newAuth;
  }
}

export default Auth;
