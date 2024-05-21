// Products
export const GET_PRODUCTS_BY_CATEGORY = (cat) => `/products/category/${cat}`;
export const GET_PRODUCT_DASHBOARD_DATA = (productId) => `/products/dashboard/${productId}`;

// Product Reviews
export const GET_PRODUCT_REVIEWS = (productId, page, review_per_page) => `/reviews/${productId}?page=${page}&review_per_page=${review_per_page}`;
export const ADD_PRODUCT_REVIEW = (productId) => `/reviews/${productId}`;

// Product FAQs
export const GET_PRODUCT_FAQS = (productId, page, faq_per_page) => `/faqs/product/${productId}?page=${page}&faq_per_page=${faq_per_page}`;
export const ADD_PRODUCT_FAQ = (productId) => `/faqs/${productId}`;

// Auth 
export const SIGNUP = (type) => `/auth/${type}/signup`;
export const LOGIN = (type) => `/auth/${type}/login`;
export const VERIFY = (type, token) => `/auth/${type}/verify/${token}`;


// Orders
export const ORDER_PRODUCT = (productId) => `/order/${productId}`;

