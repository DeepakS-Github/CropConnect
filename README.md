# CropConnect

CropConnect is a web platform designed for wholesale crop trading, connecting sellers and consumers seamlessly. Although still in development, CropConnect offers a robust set of features for both sellers and consumers in the agricultural marketplace.

## Deployed Link

https://crop-connect-lime.vercel.app/

## Architecture

![diagram-export-8-15-2024-7_52_30-PM](https://github.com/user-attachments/assets/6587f476-8c76-4232-9ea5-5988ff6f3624)

## Features

1. **Dual Interfaces**: CropConnect provides separate interfaces for consumers and sellers, accessible through the navbar with options for SignUp and SignIn including email verification for the created account.

***Seller Side***

2. **Visualizing Sales Data**: Incorporated Recharts (graphs) into the project, which has allowed to create insightful visualisations of sales data.

3. **Product Management**: Sellers can easily add products, including images, details, location via map selection, current stocks, minimum order quantity restrictions, etc. which can be edited and deleted further.

4. **Order Management**: Sellers have access to a dashboard displaying order requests, including order location coordinates on a map.

5. **FAQ Section**: Sellers can address common inquiries about their products through a dedicated FAQ section visible to consumers.

6. **CropSense AI**: Powered by Gemini AI, used to predict the crops according to the given parmeters.

***Consumer Side***

7. **User-Friendly Consumer Interface**: Consumers can browse various categories and products conveniently from the homepage.

8. **Detailed Product Dashboard**: Product details, including stock availability and minimum order quantity, are displayed prominently. Users can add products to their cart directly from the dashboard.

9. **Review System**: Users can leave reviews for products, enhancing transparency and trust.

10. **Contact Farmer Form**: A contact form allows users to inquire about products directly, with answered queries becoming part of the FAQ section. It also has map which shows the product location.

11. **Dynamic Cart Functionality**: Users can manage product quantities in the cart, with limitations based on minimum order quantities and available stock.

12. **Seamless Checkout**: The checkout process allows users to review orders, including delivery charges, select delivery locations, and place orders securely.

13. **Real-Time Stock Updates (WebSocket)**: Implemented WebSocket functionality to provide real-time stock updates. Users can see live changes in stock availability without needing to reload the page. *Please note that this feature may not be visible on the deployed website (deployed on Vercel) as Vercel does not support WebSocket connections. However, if the project is run locally, real-time updates can be seen.*

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
- Gemini AI
- Other supporting technologies

## Installation

To run CropConnect locally, ensure you have NodeJS and MongoDB installed. Follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd CropConnect
    ```

2. **Frontend Setup**:
    - Navigate to the CropConnect `client` folder.
    - Create a `.env` file in the root directory of the `client` folder.
    - Add the following environment variables to the client `.env` file:
        ```plaintext
        VITE_CROPCONNECT_API = "https://cropconnect-backend.vercel.app/" 
        # Replace if you want to run the Backend local server to https://localhost:8080/
        ```
    - To run the Frontend:
        ```bash
        cd client
        npm run dev
        ```

3. **Backend Setup**:
    - Navigate to the CropConnect `server` folder.
    - Create a `.env` file in the root directory of the `server` folder.
    - Add the following environment variables to the server `.env` file:
        ```plaintext
        MONGO_DB_URL = {your mongodb url}
        GEMINI_API_KEY = {your gemini api key}
        GMAIL_ID = {your gmail id}
        APP_PASSWORD = {your google account app password}
        JWT_SECRET = {jwt secret}
        CLOUDINARY_CLOUD_NAME = {cloudinary clound name}
        CLOUDINARY_API_KEY = {cloudinary api key}
        CLOUDINARY_API_SECRET = {cloudinary api secret}
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
