import { sumArr } from "../../common/util";

const initialState = {
  cart: { list: [], count: 0, totalPrice: 0 },
  product: { list: [], count: 0, next: "" },
  modal: false,
  page: 1,
};

const rootReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case "GET_CART_ITEM":
    case "DELETE_CART_ITEM":
      return {
        ...state,
        ...{
          cart: {
            list: action.payload,
            count: action.payload.length,
            totalPrice: sumArr(
              action.payload.map(data => data.qty * data.pog.price)
            ),
          },
        },
      };

    case "ADD_CART_ITEM":
      return {
        ...state,
        ...{
          cart: {
            list: [
              ...state.cart.list,
              { pog: { ...action.payload }[0], qty: 1 },
            ],
            count: [
              ...state.cart.list,
              { pog: { ...action.payload }[0], qty: 1 },
            ].length,
            totalPrice: sumArr(
              [
                ...state.cart.list,
                { pog: { ...action.payload }[0], qty: 1 },
              ].map(data => data.qty * data.pog.price)
            ),
          },
        },
      };

    case "DELETE_CART_ALL_ITEM":
      return {
        ...state,
        ...{
          cart: {
            list: [],
            count: 0,
            totalPrice: 0,
          },
        },
      };

    case "UPDATE_CART_ITEM":
      const updateItem = state.cart.list.filter(
        el => el.id !== action.payload[0].id
      );
      updateItem[0].qty = action.qty;

      return {
        ...state,
        ...{
          cart: {
            list: [...action.payload, ...updateItem],
            count: state.cart.list.length,
            totalPrice: sumArr(
              [...action.payload, ...updateItem].map(
                data => data.qty * data.pog.price
              )
            ),
          },
        },
      };

    case "GET_PRODUCT_ITEM":
      return {
        ...state,
        ...{
          product: {
            list: action.payload.results,
            count: action.payload.count,
            next: action.payload.next,
          },
        },
      };

    case "HANDLE_MODAL":
      return {
        ...state,
        ...{ modal: action.boolean },
      };

    case "INCREASE_NEXT_PAGE":
      return {
        ...state,
        ...{ page: (state.page += 1) },
      };

    // case "INCREASE_QTY":
    //   return {
    //     };

    // case "DECREASE_QTY":
    //   return {
    //     };

    default:
      return state;
  }
};

export default rootReducer;
