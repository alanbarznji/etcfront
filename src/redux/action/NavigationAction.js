import axios from "axios";

export const NavigationOpen_Action = (
    payloads
) => {
    return async (dispatch) => {
      try {
     
 console.log(payloads);
        dispatch({
          type: 'OpenDashboard',
          payload: payloads,
        });
      } catch (error) {
        dispatch({
          type: 'err',
     
        });
      }
    };
  };
export const NavigationClose_Action = (
   
) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: 'CloseDashboard',
          payload: payloads,
        });
      } catch (error) {
        dispatch({
          type: 'err',
     
        });
      }
    };
  };
