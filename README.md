# Canchu：Socail community website

## Description
This repository is designated for the **AppWorksSchool Campus Summer Back-End project**. It constitutes a back-end system built with Express, MySQL, Redis, and Nginx.

The main functionalities contains user account management, friendship, posts, comments, and post display. The key technologies involved are as follows:

### Backend Environment and Framework

- Node.js
- Express.js
- RESTful
- MVC

### Database ( MySQL )

- Normalization
- Understanding Indexing, Primary Key, Foreign Key, and Joins to optimize the database
- Understanding the principles of SQL Injection to prevent vulnerable code

### Cloud Service

- Deployment on **Amazon Elastic Compute Cloud (Amazon EC2)**
- Managing high traffic through **Auto Scaling** and **Load Balancer** with **Amazon Elastic Load Balancer (ELB)**

### CI/CD

- Docker
- GitHub Actions
- Unit Testing with **k6**

### Other Key Concepts

- Use **Nginx** as reverse proxy server
- Use **Redis** to implement **rate limiter**
- JSON Web Tokens
- Linux

## Deployment

1. Install packages: `npm install`
2. Start MySQL server
3. Import database:
   `mysql -u <user_name> -p <canchu_db_name> < dump.sql` 
   (The database dump can be found in the `mysql` folder)
4. Create config: `.env` for back-end ( Reference template: `.env-template` )
   1. set `MYSQL_HOST`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` for MySQL server
   2. set `TOKEN_SECRET` for jwt
5. Start server: `nodemon server.js`

## Unit Test (Optional)

Run Unit test: `npm run test`
