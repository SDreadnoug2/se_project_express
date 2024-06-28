# WTWR (What to Wear?): Back End, Created by Nicholas Milton

## Description

The WTWR (What to Wear Recommendations) is my application that's designed to help users decide what clothing items to wear based on the weather.
Users can create, like, and dislike various clothing items. The application stores these items in a database, allowing users to retrieve and manage their clothing preferences conveniently!

## Functionality

- Create Clothing Items: Users can add new clothing items, specifying details such as name, weather suitability, and an image URL.
- Like/Dislike Clothing Items: Users can like or dislike clothing items, which helps in personalizing their preferences.
- Delete Clothing Items: Users can delete clothing items from their collection.
- View Clothing Items: Users can view all clothing items available in the database.

## Technologies and Techniques

- Node.js: The application is built on Node.js, providing a robust and scalable server-side environment.
- Express.js: Used as the web application framework to manage routing and middleware.
- MongoDB: A NoSQL database used to store user and clothing item data.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, used for schema definition and interaction with the database.
- Body-Parser: Middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- Validator: A library used for string validation and sanitization in the application.
- Postman: Utilized for testing API endpoints to ensure they function as expected.

## Running the Project

- `npm run start` — to launch the server
- `npm run dev` — to launch the server with the hot reload feature (nodemon)
