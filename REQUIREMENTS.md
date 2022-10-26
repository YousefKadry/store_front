users# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (get)
- Show (get)(args: product id) 
- Create [token required] (post)
- Delete [token required] (delete)


#### Users
- Index [token required] (get)
- Show (args: user id)[token required] (get)
- Create N[token required] (post)

#### Orders
- Current Order by user (args: user id)[token required] (get)
- Completed Orders by user (args: user id)[token required] (patch)

#### Orders Pooducts
-Add product to active order (args: order id)[token required] (post)
-Deete product from active order (args: order id)[token required] (delete)

## Data Shapes
#### Product
-  id  SERIAL PRIMARY KEY
- name  VARCHAR
- price  FLOAT(2)


#### User
- id  SERIAL PRIMARY KEY
- username  VARCHAR
- firstName  VARCHAR
- lastName  VARCHAR
- password  VARCHAR

#### Orders
- id  SERIAL PRIMARY KEY
- user_id  INTEGER REFERENCES users(id)
- status of order (active or complete)  VARCHAR

#### Orders Pooducts
- order_id  INTEGER REFERENCES orders(id)
- product_id of each product in the order  INTEGER REFERENCES product(id)
- quantity of each product in the order  INTEGER