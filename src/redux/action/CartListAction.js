import axios from "axios";

export const InserCartListAction = (
  sessionid, product,Quantity
) => {

    return async (dispatch) => {
      try {
  
 console.log('====================================');
 console.log( sessionid, product,Quantity);
 console.log('====================================');
          
        const res = await axios.post(
          "http://localhost:9000/api/v1/cartList",
   
{
  sessionid:sessionid,
  Product:product,
  Quantity:Quantity
}
   ,
          {
            headers: {
              'Content-Type': 'application/json',
              
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
 if(res.status==201){
await localStorage.setItem("session",res.data.data.SessionId)
 }
        dispatch({
          type: "CartListInsert",
          payload: res.data,
          status: res.status,
          
        });
      } catch (error) {
        console.log(error,'meme');
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
  export const GetCartListAction = ( session ) => {
    return async (dispatch) => {
      try {
        console.log("Session ID being used:", session); // Add this to debug
        
        const res = await axios.get(
          "http://localhost:9000/api/v1/cartList/",
          {
            headers: {
              'Content-Type': 'application/json',
              'sessionid': session
            }
          }
        );
        
        console.log("Cart request successful");
        
        dispatch({
          type: "CartListGet",
          payload: res.data,
          status: res.status,
        });
      } catch (error) {
        console.log("Error in cart request:", error);
        
        dispatch({
          type: 'err',
          err: error.response?.data || "Unknown error",
          status: error.response?.data?.error?.statuscode || 500,
        });
      }
    };
  };
export const GetCartListSearchAction = (
  search
) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/cartList?${search}`,
          {
            headers: {
              'Content-Type':'application/json',
     
            },
          }
        );
 
        dispatch({
          type: "CartListGet",
          payload: res.data,
          status: res.status,
          
        });
      } catch (error) {
        console.log(error,'meme');
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
export const PutCartListAction = (
form
) => {

    return async (dispatch) => {
      try {
        const res = await axios.put(
          "http://localhost:9000/api/v1/cartList",form,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        dispatch({
          type: "CartListPut",
          payload: res.data,
          status: res.status,
        });
      } catch (error) {
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
export const GetOneCartListAction = (
form,id
) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/cartList/${id}`,form
          ,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
        dispatch({
          type: "CartListGetOne",
          payload: res.data,
          status: res.status,
          
        });
      } catch (error) {
        console.log(error,'meme');
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
export const DeleteCartListAction = (
id
) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(
          `http://localhost:9000/api/v1/cartList/${id}` ,
          {
            headers: {
              'Content-Type': 'application/json',
              
            },
          }
        );
 
        dispatch({
          type: "CartListDelete",
          payload: res.data,
          status: res.status,
          
        });
      } catch (error) {
        console.log(error,'meme');
        dispatch({
          type: 'err',
          err: error.response.data,
          status: error.response.data.error.statuscode,
        });
      }
    };
  };
