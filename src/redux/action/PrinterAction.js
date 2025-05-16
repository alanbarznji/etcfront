import axios from "axios";

export const InserPrinterAction = (
form
) => {
  const Token = localStorage.getItem('auth_token');
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.post(
          "http://localhost:9000/api/v1/product",
   
form
   ,
 {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer'+ Token,
            },
          }
        );
        console.log('====================================');
        console.log(res,"lllllll,.");
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "printerInsert",
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
export const GetPrinterAction = (limit) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
         `http://localhost:9000/api/v1/product/printer?limit=${limit||20}&Category=67e890ce36067c6d8d7ee793`,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "printerGet",
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
export const GetPrinterSearchAction = (
  search
) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/product?keyword=${search}`&category,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );

      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "printerGet",
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
export const PutPrinterAction = (
form,printer
) => {
  const Token = localStorage.getItem('auth_token');
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          `http://localhost:9000/api/v1/product/${printer}`,
   
        form
          ,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer'+Token,
            },
          }
        );

      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "printerPut",
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
export const GetOnePrinterAction = (
form,id
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.get(
          `http://localhost:9000/api/v1/product/${id}`,
   
form
 &category  ,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );

      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "printerGetOne",
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
export const DeletePrinterAction = (
id
) => {
    return async (dispatch) => {
      try {
  
        const Token = localStorage.getItem('auth_token');
          
        const res = await axios.delete(
          `http://localhost:9000/api/v1/product/${id}` ,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer'+ Token,
            },
          }
        );
 
        dispatch({
          type: "printerDelete",
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