# Teebay

Teebay is a web application built with React, Apollo Client, NestJS, GraphQL, and Prisma. It allows users to browse and purchase products online.
## Getting Started

To get started with the application, follow these steps:

1. Install Docker and Docker Compose on your machine if you haven't already done so.

2. Clone the repository to your local machine.
```
git clone https://github.com/arnab000/Teebay.git
```

3. Navigate to teebay_backend folder (backend)
```
cd teebay_backend 
```

and then run

```
docker-compose up
```
4. When the database is up running, create a different instance on the terminal, don't stop the databese and run these command on backend
```

npm install
npx prisma migrate dev
npm run start
```
It will open up a server  at 4000.
5.Then for the frontend, navigate to teebay folder(frontend)
```
cd teebay 

```

run this simple two commands
```
npm install
npm start
```




