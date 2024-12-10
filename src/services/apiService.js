import axios from "axios";
import { get } from "react-hook-form";
const api = axios.create(
    {
        baseURL : 'http://127.0.0.1:4000',
    }
)
// Thêm interceptor để tự động thêm token vào header Authorization
// api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('tk'); // Lấy token từ localStorage
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

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

    adminLogin:(credentials)=>api.post('/employees/login',credentials),
    adminRegister:(userInfor)=>  api.post('/employees/register',userInfor),
    adminVerifyEmail: (email) => api.post(`/employees/email_verification/${email}`),
    adminSendOTP:(email,otp) => api.post('/employees/verify1', {email, otp}),
    adminResetPassword:() => api.post('/employees/resetpass'),
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
    updateProduct: (product) => api.put(`/products`, product),
    deleteProduct: (id) => api.delete(`/products/${id}`),
    getHomePage: () => api.get('/products/home'),
    getRelativeProducts: (id) => api.get(`/products//${id}/relatedproduct`),
    getSearchedProducts: (params) =>api.get(`/products/search`, params),
}

export const brandService = {
    getAllBrand: () => api.get('/brands'),
    createBrand: (formData) => api.post(`/brands/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    updateBrand: (id,formData) => api.put(`/brands/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      deleteBrandById: (id) => api.delete(`/brands/${id}`),
}

export const categoryService = {
    getProductByCategoryId: (id, config) => api.get(`/categories/${id}/products`, config),
    getCategoryById: (id) => api.get(`/categories/${id}`),
    getAllCategories: () => api.get('/categories'),
    createCategory: (formData) => api.post('/categories/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    updateCategory: (id,formData) => api.put(`/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    getFilterOptions: (id) => api.get(`/categories/${id}/filters`),
    getAllBrandsById: (id) => api.get(`/categories/${id}/brands`),
    deleteCategoryById: (id) => api.delete(`/categories/${id}`),
}

export const commonService = {
    getBanners: () => api.get('/banners'),
    getReviewsByProductId: (productId) => api.get(`/reviews/${productId}`),
    addReviews: (review) => api.post('/reviews', review),
    getAddresseByUserId: (id) => api.get(`/address/${id}/getdefault`),
}

export const cartService = {
    getCartByUserId: (id) => api.get(`/carts/${id}/user`),
    addProductToCart: (user, product, quantity, memory, color) => api.put("/carts", {user, product, quantity, memory, color}),
    updateCart: (cartData)=> api.put("/carts", cartData),
    removeProductFromCart: (user, product) => api.post("/carts", {user, product}),
    removeAllProductsFromCart: () => api.post("/carts/removeall"),

}

export const adminService = {
    getAllProducts: () => api.get('/employees/products'),
    getProductById: (id) => api.get(`/employees/products/${id}`),
    getCategories: (config) => api.get('/employees/categories',config),
    getBrands: (config) => api.get('/employees/brands',config),
    getUsers: (config) => api.get('/employees/users',config),
    getStaffs: (config) => api.get('/employees/staffs',config),
    getOrders: (config) => api.get('/employees/orders',config),
    postProducts: (productData) => api.post('/employees/products', productData,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
    ),
    updateSpecifications: (productId, specifications) => api.put(`/specifications/${productId}`, 
        { specifications },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ),
    updateVariants: (id, variants) => api.put(`/variants/${id}`,{variants}),
    updateUser: (userId, user) => api.put(`/users/${userId}`,user,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
    ),
    deleteReview: (review) => api.delete(`/reviews/${review}`),
}