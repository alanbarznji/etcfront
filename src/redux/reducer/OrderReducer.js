const initialState = {
  Orders: [],
  Order: null,
  error: null,
  errState: false,
  loading: false,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OrderInsert":
    case "OrderPut":
    case "OrderDelete":
      return {
        ...state,
        loading: false,
        errState: false,
        Orders:  action.payload, // Adjust based on your needs
      };

    case "OrderGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Orders: action.payload,
      };

    case "OrderGetOne":
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

export default OrderReducer;
