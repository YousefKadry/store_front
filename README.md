# Storefront Backend Project
API for storefront website which allow user to create account, browse different products, create order, add and delete products from it.

### The API built using:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine and supertest from npm for testing
- jwt from npm for authrethation 
- bcrypt from npm for security

### Functionality and endpoints:
- User can use `/user` endpoint for creating account using post method, sign in using get method (`/user/signin`), show users using get method or show specific user by passing his id using path parameter using get method.
- User can use `/product` endpoint for creating new product using post method, show all products using get method, show specific product by passing its id using path parameter useing get method or deleteing product by passing its id using path parameter using delete method.
- User can use `/order` endpoint for creating order using post method, show active orders for specific user using get method.
- User can use `/order/:order_id` endpoint for adding product to specific active order by order id using path parameter using post method (`/order/:order_id/addProduct`) or deleteing product from specific active order by order id using path parameter using post method(`/order/:order_id/deleteProduct`).


#### installing modules and running the API: 
run the following commands to:
- install the used modules run the command: 
> npm install 

- build the project:
> npm run build

- build the API and run its tests(require test database (store_front_test) and setting env variables with your right info):
> npm run test

- start the API server:
> npm run start 

#### Creating and Conncting the Databas:
You can not run the app before creating the database
You have to create database store_front using psql shell, setting .env file with right info for env variables and then run this command:
> db-migrate up 
now you can run the app using start script