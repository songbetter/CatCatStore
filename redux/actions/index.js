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

export const increaseNextPage = () => {
  return {
    type: "INCREASE_NEXT_PAGE",
  };
};

export const getProduct = item => {
  return {
    type: "GET_PRODUCT_ITEM",
    payload: item,
  };
};

export const handleModal = boolean => {
  return {
    type: "HANDLE_MODAL",
    boolean,
  };
};

export const increaseQty = () => {
  return {
    type: "INCREASE_QTY"
  }
}

export const decreaseQty = () => {
  return {
    type: "DECREASE_QTY"
  }
}