import axios from "axios";
const api = axios.create(
    {
        baseURL : 'http://127.0.0.1:4000',
        headers: {
            'Content-Type': 'application/json',
        },
        // withCredentials: true, // To send cookies with requests
    }
)

export const authService = {
    clientLogin:(credentials) => api.post('/user/login',credentials),
    register:(userInfor)=>  api.post('/user/register',userInfor),
    verifyEmail: (email) => api.post(`/user/email_verification/${email}`),
    sendOTP:()=> api.post('/user/verify1'),
    resetPassword:()=> api.post('/user/resetpass')
}

export const productService = {

}

