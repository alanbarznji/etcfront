const init = {
  packages:[],
  package:[],
    dashboard: true,
    status:null
  };
  const PackageReducer = (state = init, action) => {      

    
    switch (action.type) {
      case "PackageInsert":
        return {
    dashboard: true,
    status:null
        };
      case "PackageUpdate":
        return {
    dashboard: true,
    status:null
        };
      case "PackageDelete":
        return {
    dashboard: true,
    status:null
        };
        case "PackageGet":
          return {
            ...state,
            loading: false,
            errState: false,
            packages: action.payload,
          };
        case "PackageGetOne":
          return {
            ...state,
            loading: false,
            errState: true,
            package: action.payload,
          };
    
 
      default:
        return state;
    }
  };
  export default PackageReducer;
  