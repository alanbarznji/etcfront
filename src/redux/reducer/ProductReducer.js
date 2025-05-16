const initialState = {
  products: [],
  product: null,
  paginate: null,
  error: null,
  errState: false,
  loading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ProductInsert":
    case "ProductPut":
    case "ProductDelete":
      return {
        ...state,
        loading: false,
        errState: false,
        products:  action.payload, // Adjust based on your needs
      };

    case "ProductGet":
      return {
        ...state,
        loading: false,
        errState: false,
        products: action.payload,
        paginate:action.payload.paginationResult
      };

    case "ProductGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        product: action.payload,
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

export default productReducer;
