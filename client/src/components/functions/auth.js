import axios from 'axios'

export const register = async(valse)=>
    await axios.post(process.env.REACT_APP_API+"/register",valse);

export const login = async(valse)=>
    await axios.post(process.env.REACT_APP_API+"/login",valse);

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-user",
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  }

export const currentAdmin= async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-admin",
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  }
