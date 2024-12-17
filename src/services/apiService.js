import axios from "axios";
import { get } from "react-hook-form";
const tkToken = localStorage.getItem("tk");
const acToken = localStorage.getItem("access_token");
const api = axios.create(
    {
        baseURL: "https://techzone-2ow9.onrender.com",
        headers: {
            Authorization: `Bearer ${acToken}`,
        },
    }
)



export const employeeServiceApi = axios.create({
    baseURL: "https://techzone-2ow9.onrender.com",
    headers: {
        Authorization: `Bearer ${tkToken}`,
    },
});


export const authService = {
    clientLogin:(credentials) => api.post('/users/login',credentials),
    register:(userInfor)=>  api.post('/users/register',userInfor),
    verifyEmail: (email) => api.post(`/users/email_verification/${email}`),
    sendOTP:(email,otp) => api.post('/users/verify1', {email, otp}),
    resetPassword:(data) => api.post('/users/resetpass',data),
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
    updateProduct: (product) => api.put(`/products`, product, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
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
    deleteBanner: (id) => api.delete(`/banners/${id}`),
    getReviewsByProductId: (productId) => api.get(`/reviews/${productId}`),
    addReviews: (review) => api.post('/reviews', review),
    getAddresseByUserIdDefault: () => api.get(`/address/getdefault`),
    getAddresseByUserId: (userId) => api.get(`/address`,userId),
    getOrderByUserId: () => api.get(`/orders`),
    createOrder: (order) => api.post('/orders', order),
    createAddress: (address) => api.post('/address/create', address),
    deleteAddress: (userId, addressId) => api.delete(`/address/user/${userId}/location/${addressId}`),
    updateAddress: (data) => api.put('/address', data),
    likeProduct: (data) => api.put('/favourites', data),
    getFavouriteProduct: (userId) => api.get(`/favourites/products/${userId}`),
    getRevenue: (config) => api.get(`/orders/statistic`,config),
}


export const bannerService = {
    getBanners: () => api.get(`/banners`),
    updateBanners: (formdata) => employeeServiceApi.put('/banners',formdata,{
        headers: { "Content-Type": "multipart/form-data" },
      }),
    createBanners: (formdata) => employeeServiceApi.post('/banners/create', formdata,{
        headers: { "Content-Type": "multipart/form-data" },
      }),
}


export const cartService = {
    getCartByUserId: () => api.get(`/carts/user`),
    addProductToCart: (user, product, quantity, memory, color) => api.put("/carts", {user, product, quantity, memory, color}),
    updateCart: (cartData)=> api.put("/carts", cartData),
    removeProductFromCart: (user, product) => api.post("/carts", {user, product}),
    removeAllProductsFromCart: () => api.post("/carts/removeall"),

}

export const filtersService = {
    getFilters: () => api.get("/filters"),
    createFilters: (values) => api.post(`/filters`, values),
    updateFilters: (id, values) => api.put(`/filters/${id}`, values),
}

export const adminService = {
    getAllProducts: (config) => employeeServiceApi.get('/employees/products',config),
    getAllProductOnSales: (config) => employeeServiceApi.get('/employees/products/sales',config),
    getProductById: (id) => employeeServiceApi.get(`/employees/products/${id}`),
    getCategories: (config) => employeeServiceApi.get('/employees/categories',config),
    getBrands: (config) => employeeServiceApi.get('/employees/brands',config),
    getUsers: (config) => employeeServiceApi.get('/employees/users',config),
    deleteUsers: (id) => employeeServiceApi.delete(`/users/${id}`),
    deleteEmployees: (id) => employeeServiceApi.delete(`/employees/${id}`),
    getStaffs: (config) => employeeServiceApi.get('/employees/staffs',config),
    createStaff: (config) => employeeServiceApi.post('/employees/register',config),
    getOrders: (config) => employeeServiceApi.get('/employees/orders',config),
    getOrdersById: (id) => employeeServiceApi.get(`/orders/${id}`),
    updateOrder: (id,config) => employeeServiceApi.put(`/orders/${id}`, config),
    deleteOrders: (id) => employeeServiceApi.delete(`/orders/${id}`),
    postProducts: (productData) => employeeServiceApi.post('/employees/products', productData,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
    ),
    updateSpecifications: (productId, specifications) => employeeServiceApi.put(`/specifications/${productId}`, 
        { specifications },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ),
    updateVariants: (variants) => employeeServiceApi.put(`/variants`,{variants}),
    createVariant: (variant) => employeeServiceApi.post(`/variants/create`,{variant}),
    deleteVariant: (variant) => employeeServiceApi.delete(`/variants/${variant}`),
    updateUser: (userId, user) => employeeServiceApi.put(`/users/${userId}`,user,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
    ),
    updateStaff: (userId, user) => employeeServiceApi.put(`/employees/${userId}`,user,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
    ),
    getStatisticOrders: () => employeeServiceApi.get(`/orders/statisticProduct`),
    getReviews: (config) => employeeServiceApi.get(`/reviews`,config),
    deleteReview: (review) => employeeServiceApi.delete(`/reviews/${review}`),
    getAllBils: (config) => employeeServiceApi.get(`/bills`,config),
}