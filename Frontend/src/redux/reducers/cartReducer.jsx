import { ADD_TO_CART, DEC_QTY_IN_CART, INC_QTY_IN_CART, REMOVE_FROM_CART } from "../constants";

let initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      const productToRemove = action.payload;
      const updatedCart = state.filter((item) => item._id !== productToRemove);
      return updatedCart;
    case INC_QTY_IN_CART:
      const productIdToIncQty = action.payload;
      const updatedCartByIncQty = state.map((item) => {
        // console.log(item);
        if (item._id === productIdToIncQty && item.qty!==item.stocksLeft) {
          return { ...item, qty: item.qty + 1, currentPrice: item.currentPrice + item.pricePerUnit};
        }
        return item;
      });
      return updatedCartByIncQty;
    case DEC_QTY_IN_CART:
      const productIdToDecQty = action.payload;
      const updatedCartByDecQty = state.map((item) => {
        // console.log(item);
        if (item._id === productIdToDecQty && item.qty!==item.minQty) {
          return { ...item, qty: item.qty - 1, currentPrice: item.currentPrice - item.pricePerUnit };
        }
        return item;
      });
      return updatedCartByDecQty;
    default:
      return state;
  }
};
