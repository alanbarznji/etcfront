const initialState = {
  printers: [],
  printer: null,
  error: null,
  errState: false,
  loading: false,
};

const printerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "printerInsert":
    case "printerPut":
    case "printerDelete":
      return {
        ...state,
        loading: false,
        errState: false,
        printers:  action.payload, // Adjust based on your needs
      };

    case "printerGet":
      return {
        ...state,
        loading: false,
        errState: false,
        printers: action.payload,
      };

    case "printerGetOne":
      return {
        ...state,
        loading: false,
        errState: false,
        printer: action.payload,
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

export default printerReducer;
