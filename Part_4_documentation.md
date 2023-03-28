
## Backend

This backend was built using Prisma, GraphQL, and NestJS. Prisma is an ORM tool that provides a type-safe and database agnostic way to access and manipulate data. GraphQL is a query language and runtime for APIs that allows specifying exactly what data is needed in API requests. NestJS is a framework for building server-side applications with Node.js that provides a modular architecture and a set of useful features for building scalable and maintainable applications.

In this backend, Prisma was used to define the data models and generate a type-safe Prisma Client for querying and mutating data. GraphQL was used to define the API schema and operations. NestJS was used to define the API routes and controllers, as well as to organize the application's functionality into reusable and modular components.

The combination of Prisma, GraphQL, and NestJS provides a powerful and scalable way to build server-side applications with Node.js that are easy to maintain and extend.

The given schema will give a better idea of how the relation in table are being made
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @default(autoincrement()) @id
  email    String  @unique
  name     String?
  phone    String?
  password String?
  address  String?
  productsForSale Product[] @relation("seller")
 
  productsBought Product[] @relation("buyer")
  productsRentedSE RentSystem[]@relation("renterSE")
}

model Product {
  id           Int      @default(autoincrement()) @id
  title        String
  description  String?
  price        Int
  rent         Int
  sold         Boolean?
  seller       User?    @relation("seller", fields: [sellerId], references: [id])
  sellerId     Int?
  buyer        User?    @relation("buyer", fields: [buyerId], references: [id])
  buyerId      Int?
  renterS      RentSystem[]
  rentType     String
  categories   Categories[] @relation("productCategories")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model RentSystem {
  id        Int        @default(autoincrement()) @id
  renter    User?      @relation("renterSE",fields: [renterId], references: [id])
  renterId  Int
  startTime DateTime
  endTime   DateTime
  products  Product[]
}

model Categories {
  id      Int          @default(autoincrement()) @id
  name    String
  products Product[]   @relation("productCategories")
}

```
## Frontend

This frontend was built using React, Apollo Client, and GraphQL. React is a popular JavaScript library for building user interfaces. It is declarative and component-based, meaning that you define reusable components that encapsulate their own state and logic, and then compose them together to build complex UIs.

Apollo Client is a powerful GraphQL client that enables efficient data fetching and caching, as well as real-time updates and optimistic UI. Apollo Client abstracts away the complexity of making requests and handling responses, and provides a simple and intuitive API for querying and mutating data.

GraphQL is a query language for APIs that allows specifying exactly what data is needed in API requests. GraphQL provides a powerful and flexible way to query and mutate data, and enables efficient and predictable data fetching. With GraphQL, you define a schema that describes the API's data and operations, and clients can query the API using GraphQL queries that specify the exact data they need.

In this frontend, React was used to build the UI components and manage the application's state. Apollo Client was used to fetch and cache data from a GraphQL API, and to subscribe to real-time updates. GraphQL was used to define the API schema and operations, and to enable efficient data fetching.

The combination of React, Apollo Client, and GraphQL provides a powerful and efficient way to build complex and responsive user interfaces that fetch and update data from a backend API.


the routes used:
'/log-in' for login
'/my-products' for products for sale
'/add-products' for adding Products 
'/edit-products/:id' for editing a specific product
'/all-products'  for showing all products
'/activity' for showing the activity history
