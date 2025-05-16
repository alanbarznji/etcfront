const init = {
    Page: 1,
  };
  const DashboardChangeReducer = (state = init, action) => {      
    switch (action.type) {
      case "ChangeDashboard":
        return {
          Page: action.payload,
        };
      case "CloseDashboard":
        return {
          dashboard: 1,
        };

      default:
        return state;
    }
  };
  export default DashboardChangeReducer;
  