// * Los controllers no se comunican de manera DIRECTA con la Base de datos ni con las librerías.
import { getUserData, updateUserData } from "./user";
import { findUserByEmailAndCode, sendCode } from "./auth";
import { getProductsByLimitAndOffset, getProductById } from "./product";
import { generateOrder } from "./order";

export {
  getUserData,
  sendCode,
  findUserByEmailAndCode,
  updateUserData,
  getProductsByLimitAndOffset,
  getProductById,
  generateOrder,
};
