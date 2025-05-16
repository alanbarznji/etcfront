import axios from "axios";

export const InserProductAction = (
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

      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "ProductInsert",
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
export const GetProductAction = (limit) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/product?limit=${limit||20}`,
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
          type: "ProductGet",
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
export const GetProductsAction = (limit) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/product/allproduct?limit=${limit}`,
          {
            headers: {
              'Content-Type':'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );

      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
      console.log(res.data,":::::");
      
        dispatch({
          type: "ProductGet",
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
export const GetProductsFilterAction = (limit,Filter,search,value,page) => {
    return async (dispatch) => {
      try {   
        console.log(Filter);
        
        const res = await axios.get(
          `http://localhost:9000/api/v1/product/allproduct?page=${page||1}&limit=${limit||20}&Filters=[${Filter.map(e=>`"${e}"`)}]&keyword=${search||""}&PriceSell[lte]=${value.max||Infinity}&PriceSell[gte]=${value.min||0}`,
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
          type: "ProductGet",
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
export const GetProductCategoryAction = (limit,cat) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/product/allproduct?limit=${limit||20}&Category=${cat}`,
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
          type: "ProductGet",
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
export const GetProductSearchAction = (
  search
) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/product?keyword=${search}`,
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
          type: "ProductGet",
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
export const PutProductAction = (
form,product
) => {
  const Token = localStorage.getItem('auth_token');
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          `http://localhost:9000/api/v1/product/${product}`,
   
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
          type: "ProductPut",
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
export const GetOneProductAction = (
 id
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.get(
          `http://localhost:9000/api/v1/product/${id}`,
   
 
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
          type: "ProductGetOne",
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
export const DeleteProductAction = (
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
          type: "ProductDelete",
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