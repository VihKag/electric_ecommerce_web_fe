import axios from "axios";
const api = axios.create(
    {
        baseURL : 'http://127.0.0.1:4000',
        // withCredentials: true, // To send cookies with requests
    }
)

export const authService = {
    clientLogin:(credentials) => api.post('/users/login',credentials),
    register:(userInfor)=>  api.post('/users/register',userInfor),
    verifyEmail: (email) => api.post(`/users/email_verification/${email}`),
    sendOTP:() => api.post('/users/verify1'),
    resetPassword:() => api.post('/users/resetpass'),
    authToken:(token) => api.post('/users/logintoken',null,{
        headers:{
            'token': `Baerer ${token}`,
        }
    }),
}

export const productService = {

}

