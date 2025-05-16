import axios from "axios";

export const InserOrderAction = (
form
) => {

    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.post(
          "http://localhost:9000/api/v1/order",
   
form
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
 
        dispatch({
          type: "OrderInsert",
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
export const GetOrderAction = () => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          "http://localhost:9000/api/v1/order",
          {
            headers: {
              'Content-Type':'application/json',
 
            },
          }
        );
 
        dispatch({
          type: "OrderGet",
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
export const GetOrderSearchAction = (
  search
) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/order?keyword=${search}`,
          {
            headers: {
              'Content-Type':'application/json',
     
            },
          }
        );
 
        dispatch({
          type: "OrderGet",
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
export const PutOrderAction = (
form
) => {

    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          "http://localhost:9000/api/v1/order",
          form,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "OrderPut",
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
export const GetOneOrderAction = (
 id
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.get(
          `http://localhost:9000/api/v1/order/${id}` 
   ,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "OrderGetOne",
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
export const CheckOneOrderAction = (
 id,state
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          `http://localhost:9000/api/v1/order/${id}` ,
          {
            state:state
          }
   ,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "OrderGetOne",
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
export const DeleteOrderAction = (
id
) => {
    return async (dispatch) => {
      try {
  
      
          
        const res = await axios.delete(
          `http://localhost:9000/api/v1/order/${id}` ,
          {
            headers: {
              'Content-Type': 'application/json',
              
            },
          }
        );
 
        dispatch({
          type: "OrderDelete",
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