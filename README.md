# Canchu：Socail community website

## Description

This repository is designated for the AppWorksSchool Campus Summer Back-End project. It constitutes a back-end system built with Express, MySQL, Redis, and Nginx.

The main functionalities encompass:

- User Account Management
- Social Networking
- Posts
- Comments
- Post Display

The key technologies involved are as follows:

### Backend Environment and Framework

- Node.js
- Express.js
- RESTful
- MVC

### Database

- MySQL
- Normalization
- Understanding Indexing, Primary Key, Foreign Key, and Joins to optimize the database
- Understanding the principles of SQL Injection to prevent vulnerable code

### Cloud Service

- Deployment on AWS EC2
- Managing high traffic through Auto Scaling and Load Balancer

### CI/CD

- Docker
- GitHub Actions
- Unit Testing

### Key Concepts

- JWT (JSON Web Tokens)
- SCRUM
- Nginx
- Linux

### Deployment

1. Install packages: `npm install`
2. Start MySQL server
3. Import database:
   `mysql -u <user_name> -p <canchu_db_name> < canchu.sql`
4. Create config: `.env` for back-end (Reference template: `.env-template`)
   1. set `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` for MySQL server (`DB_DATABASE_TEST` is Optional)
   2. set `NODE_ENV` to `development` for development
   3. set `TOKEN_SECRET` for jwt
   4. set `BCRYPT_SALT` f ㄊ or password encryption (Optional)
5. Start server: `nodemon app.js` or `npm run dev`

### Integration Test (Optional)

1. Import `canchu_test.sql` into database
2. Set `DB_DATABASE_TEST` key to `<canchu_test_db_name>`
3. Run integration test: `npm run test`
