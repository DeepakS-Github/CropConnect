// Products
export const GET_PRODUCTS_BY_CATEGORY = (cat, page, products_per_page) =>
  `/products/category/${cat}?page=${page}&products_per_page=${products_per_page}`;
export const GET_PRODUCT_DASHBOARD_DATA = (productId) =>
  `/products/dashboard/${productId}`;
export const GET_SELLER_PRODUCTS = `/products/seller`;
export const UPDATE_PRODUCT = (productId) => `/products/${productId}`;
export const ADD_PRODUCT = `/products`;
export const DELETE_PRODUCT = (productId) => `/products/${productId}`;
export const GET_MAIN_PRODUCT_DASHBOARD_DATA = (productId) =>
  `/products/mainProductData/${productId}`;

// Product Reviews
export const GET_PRODUCT_REVIEWS = (productId, page, review_per_page) =>
  `/reviews/${productId}?page=${page}&review_per_page=${review_per_page}`;
export const ADD_PRODUCT_REVIEW = (productId) => `/reviews/${productId}`;

// Product FAQs
export const GET_PRODUCT_FAQS = (productId, page, faq_per_page) =>
  `/faqs/product/${productId}?page=${page}&faq_per_page=${faq_per_page}`;
export const ADD_PRODUCT_FAQ = (productId) => `/faqs/${productId}`;
export const GET_SELLER_FAQS = (isAnswered) =>
  `/faqs/showbyseller?isAnswered=${isAnswered}`;
export const ANSWER_FAQ = (faqId) => `/faqs/${faqId}`;

// Auth
export const SIGNUP = (type) => `/auth/${type}/signup`;
export const LOGIN = (type) => `/auth/${type}/login`;
export const VERIFY = (type, token) => `/auth/${type}/verify/${token}`;

// Orders
export const ORDER_PRODUCT = `/order`;

// CropSense AI
export const CROP_PREDICTOR = (
  soil,
  altitude,
  temperature,
  humidity,
  rainfall
) =>
  `/ai/crops?soil=${soil}&altitude=${altitude}&temperature=${temperature}&humidity=${humidity}&rainfall=${rainfall}`;

// Seller Graphs
export const GRAPH = `/graph`;

// Seller Orders
export const GET_SELLER_ORDERS = `/order`;
