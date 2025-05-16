import axios from "axios";

export const InserPackageAction = (
form
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.post(
          "http://localhost:9000/api/v1/package",
   
form
   ,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "PackageInsert",
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
export const GetPackageAction = (
  limit
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.get(
          `http://localhost:9000/api/v1/package?limit=${limit||10}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "PackageGet",
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
export const PutPackageAction = (
form,pack
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.put(
          `http://localhost:9000/api/v1/package/${pack}`,
   
form
   ,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "PackageUpdate",
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
export const GetOnePackageAction = (
pack
) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/package/${pack}`,
          {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
        dispatch({
          type: "PackageGetOne",
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
export const DeletePackageAction = (
packageId
) => {
    return async (dispatch) => {
      try {
  
 
          
        const res = await axios.delete(
          `http://localhost:9000/api/v1/package/${packageId}`,
 
 
          {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer'+ Cookies.get('auth_token'),
            },
          }
        );
 
      //   console.log(Cookies.get('auth_token'),res.data);
      //   localStorage.setItem('auth_token', res.data.Token);
        dispatch({
          type: "PackageDelete",
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