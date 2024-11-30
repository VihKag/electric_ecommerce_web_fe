import axios from "axios";
import { get } from "react-hook-form";
const api = axios.create(
    {
        baseURL : 'http://127.0.0.1:4000',
    }
)

export const authService = {
    clientLogin:(credentials) => api.post('/users/login',credentials),
    register:(userInfor)=>  api.post('/users/register',userInfor),
    verifyEmail: (email) => api.post(`/users/email_verification/${email}`),
    sendOTP:(email,otp) => api.post('/users/verify1', {email, otp}),
    resetPassword:() => api.post('/users/resetpass'),
    authToken:(token) => api.post('/users/logintoken',null,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }),
}

export const productService = {
    getAllProduct:() => api.get('/products'),
    getProducts:(page) => api.get('/products/sort', {
        params: {
            page: 1,
            limit: 10,
        },
    }),
    getProductById: (id) => api.get(`/products/${id}`),
    addProduct: (product) => api.post('/products/create', product),
    updateProduct: (product) => api.put(`/products/${product._id}`, product),
    deleteProduct: (id) => api.delete(`/products/${id}`),
    getHomePage: () => api.get('/products/home'),
    getRelativeProducts: (id) => api.get(`/products//${id}/listallproduct`),
    getSearchedProducts: (params) =>api.get(`/products/search`, params),
      
}

export const categoryService = {
    getProductByCategoryId: (id, config) => api.get(`/categories/${id}/products`, config),
    getCategoryById: (id) => api.get(`/categories/${id}`),
    getAllCategories: () => api.get('/categories'),
    addCategory: (category) => api.post('/categories/create', category),
    getFilterOptions: (id) => api.get(`/categories/${id}/filters`),
    getAllBrandsById: (id) => api.get(`/categories/${id}/brands`)
}

export const commonService = {
    getBanners: () => api.get('/banners'),
    getReviewsByProductId: (id) => api.get('/reviews'),
}

export const cardService = {
    getCategoryByUserId: (id) => api.get(`/carts/${id}/user`),
    addProductToCart: (user, product, quantity, memory, color) => api.put("/carts", {user, product, quantity, memory, color}),
    removeProductFromCart: (user, product) => api.post("/carts", {user, product}),
    removeAllProductsFromCart: () => api.post("/carts/removeall"),

}