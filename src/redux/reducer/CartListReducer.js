const initialState = {
  Cart: [],
  Session: null,
  error: null,
  errState: false,
  loading: false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CartListInsert":
      return {
        ...state,
        loading: false,
        errState: false,
        Cart:  action.payload, // Adjust based on your needs
      };
    case "CartListPut":
    case "CartListDelete":
      return {
        ...state,
        loading: false,
        errState: false,
        Cart:  action.payload, // Adjust based on your needs
      };

    case "CartListGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Cart: action.payload,
      };

    case "CartListGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        Order: action.payload,
      };

    case "err":
      return {
        ...state,
        loading: false,
        errState: true,
        error: action.err,
      };

    default:
      return state;
  }
};

export default CartReducer;
