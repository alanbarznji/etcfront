const initialState = {
  Categorys: [],
  Category: null,
  error: null,
  errState: false,
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CategoryInsert":
    case "CategoryPut":
    case "CategoryDelete":
      return {
        ...state,
        loading: false,
        errState: false,
        Categorys:  action.payload, // Adjust based on your needs
      };

    case "CategoryGet":
      return {
        ...state,
        loading: false,
        errState: false,
        Categorys: action.payload,
      };

    case "CategoryGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        Category: action.payload,
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

export default categoryReducer;
