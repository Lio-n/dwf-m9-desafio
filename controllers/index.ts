// * Los controllers no se comunican de manera DIRECTA con la Base de datos.
import { getOrdersFromUser, getUserData, setOrderGenerated, updateUserData } from "./user";
import { validateEmailAndCode, sendCode } from "./auth";
import { getProductsByLimitAndOffset, getProductById } from "./product";
import { generateOrder, getOneOrder, getOrders, setPurchaseAsConfirmed } from "./order";

export {
  getUserData,
  sendCode,
  validateEmailAndCode,
  updateUserData,
  getProductsByLimitAndOffset,
  getProductById,
  generateOrder,
  setOrderGenerated,
  getOrdersFromUser,
  getOrders,
  getOneOrder,
  setPurchaseAsConfirmed,
};
