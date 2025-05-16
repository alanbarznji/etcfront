const init = {
    dashboard: true,
  };
  const DashboardReducer = (state = init, action) => {      
    switch (action.type) {
      case "OpenDashboard":
        return {
          dashboard: action.payload,
        };
      case "CloseDashboard":
        return {
          dashboard: false,
        };
   
      default:
        return state;
    }
  };
  export default DashboardReducer;
  