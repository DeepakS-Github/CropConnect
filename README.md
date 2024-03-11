# CropConnect

CropConnect is a web platform designed for wholesale crop trading, connecting sellers and consumers seamlessly. Although still in development, CropConnect offers a robust set of features for both sellers and consumers in the agricultural marketplace.

## Deployed Link

https://crop-connect-lime.vercel.app/

## Features

1. **Dual Interfaces**: CropConnect provides separate interfaces for consumers and sellers, accessible through the navbar with options for SignUp and SignIn.

***Seller Side***

2. **Visualizing Sales Data**: Incorporated Recharts (graphs) into the project, which has allowed to create insightful visualisations of sales data.

3. **Product Management**: Sellers can easily add products, including images, details, location via map selection, current stocks, minimum order quantity restrictions, etc. which can be edited and deleted further.

4. **Order Management**: Sellers have access to a dashboard displaying order requests, including order location coordinates on a map.

5. **FAQ Section**: Sellers can address common inquiries about their products through a dedicated FAQ section visible to consumers.

***Consumer Side***

6. **User-Friendly Consumer Interface**: Consumers can browse various categories and products conveniently from the homepage.

7. **Detailed Product Dashboard**: Product details, including stock availability and minimum order quantity, are displayed prominently. Users can add products to their cart directly from the dashboard.

8. **Review System**: Users can leave reviews for products, enhancing transparency and trust.

9. **Contact Farmer Form**: A contact form allows users to inquire about products directly, with answered queries becoming part of the FAQ section. It also has map which shows the product location.

10. **Dynamic Cart Functionality**: Users can manage product quantities in the cart, with limitations based on minimum order quantities and available stock.

11. **Seamless Checkout**: The checkout process allows users to review orders, including delivery charges, select delivery locations, and place orders securely.

12. **Real-Time Stock Updates (WebSocket)**: Implemented WebSocket functionality to provide real-time stock updates. Users can see live changes in stock availability without needing to reload the page. *Please note that this feature may not be visible on the deployed website (deployed on Vercel) as Vercel does not support WebSocket connections. However, if the project is run locally, real-time updates can be seen.*

## Technologies Used

- MongoDB
- NodeJS
- ExpressJS
- ReactJS
- Redux
- Tailwind CSS
- Websocket (socket.io)
- Cloudinary (for image storage)
- Leaflet (for map)
- Unsplash (for images)
- Recharts (for graphs)
- Other supporting technologies

## Installation

To run CropConnect locally, ensure you have NodeJS and MongoDB installed. Follow these steps:

1. **Clone the repository**:
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


**If you find this project helpful, we'd appreciate it if you could give it a star ⭐.**
