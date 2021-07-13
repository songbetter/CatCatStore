// 덕스패턴 연습하기
import createReducer from '../common/createReducer';

export const addCart = item => {
  return {
    type: "ADD_CART_ITEM",
    payload: item,
  };
};

export const deleteCart = item => {
  return {
    type: "DELETE_CART_ITEM",
    payload: item,
  };
};

export const deleteAllCart = () => {
  return {
    type: "DELETE_CART_ALL_ITEM",
  };
};

export const getCart = item => {
  return {
    type: "GET_CART_ITEM",
    payload: item,
  };
};

export const updateCart = (item, quantity) => {
  return {
    type: "UPDATE_CART_ITEM",
    payload: item,
    qty: quantity,
  };
};

const INITIAL_STATE = { 
  cart: { list: [], count: 0, totalPrice: 0 }};

const reducer = createReducer(INITIAL_STATE, {
  [GET_CART_ITEM, DELETE_CART_ITEM]: (state, action) => {
    state.cart.list.push(action.payload); 
    state.cart.count = action.payload.length;
    state.cart.totalPrice = sumArr(
      action.payload.map(data => data.qty * data.pog.price)
    )}
  [ADD_CART_ITEM]: (state, action) => (state.cartList = []),
  [DELETE_CART_ALL_ITEM]: (state, action) => state.cartList.filter(list => list.id !== action.id),
  [UPDATE_CART_ITEM]: (state, action) => state.cartList.filter(list => list.id !== action.id)

});
// export default reducer;