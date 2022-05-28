import { firestore, generateToken, isCodeExpired } from "lib";
import Base from "models/base_class";

const coll = firestore.collection("auth");
class Auth extends Base {
  constructor(id: string) {
    super({ id, ref: coll.doc(id) });
  }
  static async findByEmail(email: string): Promise<null | Auth> {
    const cleanEmail = this.cleanEmail(email);
    const results = await coll.where("email", "==", cleanEmail).get();

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
    const auth = await this.findByEmail(email);

    if (!auth) throw "El email no esta registrado";
    if (auth.data.code !== code) throw "El codigo no es valido";
    if (isCodeExpired(auth.data.expires["_seconds"])) throw "El tiempo ha expirado";

    const token = generateToken(auth.data.user_id);
    return { token };
  }
  static async createNewAuth({ email, userId }: { email: string; userId: string }): Promise<Auth> {
    const cleanEmail = this.cleanEmail(email);
    const authBase = {
      email: cleanEmail,
      user_id: userId,
      code: null,
      expires: null,
    };
    const newAuthSnap = await coll.add(authBase);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = { email } as AuthData;
    return newAuth;
  }
}

export default Auth;
