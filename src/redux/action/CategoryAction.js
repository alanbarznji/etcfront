import axios from "axios";

export const InserCategoryAction = (
form
) => {
  const Token = localStorage.getItem('auth_token');
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.post(
          "http://localhost:9000/api/v1/category",
   
form
   ,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer'+ Token,
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "CategoryInsert",
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
export const GetCategoryAction = () => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          "http://localhost:9000/api/v1/category",
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
          type: "CategoryGet",
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
export const GetCategorySearchAction = (
  search
) => {
    return async (dispatch) => {
      try {   
        const res = await axios.get(
          `http://localhost:9000/api/v1/category?${search}`,
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
          type: "CategoryGet",
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
export const PutCategoryAction = (
form
) => {
  const Token = localStorage.getItem('auth_token');
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          "http://localhost:9000/api/v1/category",
   
          form
          ,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer'+Token,
            },
          }
        );
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "CategoryPut",
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
export const GetOneCategoryAction = (
form,id
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.get(
          `http://localhost:9000/api/v1/category/${id}`,
   
form
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
          type: "CategoryGetOne",
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
export const DeleteCategoryAction = (
id
) => {
    return async (dispatch) => {
      try {
  
        const Token = localStorage.getItem('auth_token');
          
        const res = await axios.delete(
          `http://localhost:9000/api/v1/category/${id}` ,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer'+ Token,
            },
          }
        );
 
        dispatch({
          type: "CategoryDelete",
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