import gen from "random-seed";

const seed = "Be random, b*tch";
const random = gen.create(seed);

const getRandomNum = (): number => random.intBetween(10000, 99999);
export default getRandomNum;
