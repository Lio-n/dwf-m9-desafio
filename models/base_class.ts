type ClassBaseConstructor = {
  id: string;
  ref: FirebaseFirestore.DocumentReference;
};

class Base {
  ref: FirebaseFirestore.DocumentReference;
  data;
  id: string;
  constructor({ id, ref }: ClassBaseConstructor) {
    this.id = id;
    this.ref = ref;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as any;
    return this.data;
  }
  push(): void {
    this.ref.update(this.data);
  }
  setData(newData): void {
    this.data = { ...newData };
  }
  static cleanEmail(email: string) {
    return email.trim().toLocaleLowerCase();
  }
}
export default Base;
