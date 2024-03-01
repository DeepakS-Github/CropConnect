# CropConnect

CropConnect is a web platform designed for wholesale crop trading, connecting sellers and consumers seamlessly. Although still in development, CropConnect offers a robust set of features for both sellers and consumers in the agricultural marketplace.

<div style="display: flex; justify-content: center; gap: 10px;">
<img src="https://github.com/DeepakS-Github/CropConnect/assets/96366840/090a50fd-293f-4e37-bdf9-6fc6f8ddbf04" alt="Image 1" style="width: 45%;">
<img src="https://github.com/DeepakS-Github/CropConnect/assets/96366840/c2e33a17-f7d1-479d-ab2a-c1254efd1ec4" alt="Image 2" style="width: 45%;">
</div>

<div style="display: flex; justify-content: center; gap: 10px;">
<img src="https://github.com/DeepakS-Github/CropConnect/assets/96366840/9ac8c38c-9929-4f5f-91ed-8dd11a4ff37d" alt="Image 1" style="width: 45%;">
<img src="https://github.com/DeepakS-Github/CropConnect/assets/96366840/0aa7bb88-cbe0-4374-9681-8c9f5723ca0e" alt="Image 2" style="width: 45%;">
</div>

## Features

1. **Dual Interfaces**: CropConnect provides separate interfaces for consumers and sellers, accessible through the navbar with options for SignUp and SignIn.

### Seller Side

2. **Product Management**: Sellers can easily add products, including images, details, location via map selection, current stocks, minimum order quantity restrictions, etc. which can be edited and deleted further.

3. **Order Management**: Sellers have access to a dashboard displaying order requests, including order location coordinates on a map.

4. **FAQ Section**: Sellers can address common inquiries about their products through a dedicated FAQ section visible to consumers.

### Consumer Side

5. **User-Friendly Consumer Interface**: Consumers can browse various categories and products conveniently from the homepage.

6. **Detailed Product Dashboard**: Product details, including stock availability and minimum order quantity, are displayed prominently. Users can add products to their cart directly from the dashboard.

7. **Review System**: Users can leave reviews for products, enhancing transparency and trust.

8. **Contact Farmer Form**: A contact form allows users to inquire about products directly, with answered queries becoming part of the FAQ section. It also has map which shows the product location.

9. **Dynamic Cart Functionality**: Users can manage product quantities in the cart, with limitations based on minimum order quantities and available stock.

10. **Seamless Checkout**: The checkout process allows users to review orders, including delivery charges, select delivery locations, and place orders securely.

## Technologies Used

- MongoDB
- NodeJS
- ExpressJS
- ReactJS
- Redux
- Cloudinary (for image storage)
- Leaflet (for map)
- Unsplash
- Other supporting technologies

## Installation

To run CropConnect locally, ensure you have NodeJS and MongoDB installed. Follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd CropConnect
    ```

2. **Frontend Setup**:
    - Navigate to the CropConnect Frontend folder.
    - Create a `.env` file in the root directory of the Frontend folder.
    - Add the following environment variables to the `.env` file:
        ```plaintext
        VITE_CROPCONNECT_API = "https://cropconnect-backend.vercel.app/" 
        # Replace if you want to run the Backend local server to https://localhost:8080/
        
        VITE_CLOUDINARY_CLOUD_NAME = {your cloudinary cloud name}
        ```
    - To run the Frontend:
        ```bash
        cd Frontend
        npm run dev
        ```

3. **Backend Setup**:
    - Navigate to the CropConnect Backend folder.
    - Create a `.env` file in the root directory of the Backend folder.
    - Add your MongoDB URL to the `.env` file:
        ```plaintext
        MONGO_DB_URL = {your mongodb url}
        ```
    - To run the Backend:
        ```bash
        # Use nodemon for automatic server restarts upon file changes
        nodemon
        # or
        # Run the server with NodeJS
        node index.js
        ```

By following these steps, you'll have the CropConnect application running locally on your machine. Adjust configurations as needed for your development environment.

## Contribution

CropConnect welcomes contributions from the community. Feel free to open issues or submit pull requests to help improve the platform.
