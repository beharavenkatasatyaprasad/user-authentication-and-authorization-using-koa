# Koa Authentication API with MongoDB and JWT

This repository contains a simple authentication API built with Koa.js and MongoDB, enabling user registration and login using JSON Web Tokens (JWT) for authentication.

## Features

- User registration with password hashing.
- User login and JWT token generation.
- Protected routes using JWT authentication.
- MongoDB as the database for storing user information.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
MONGODB_URI=mongodb://localhost:27017/mydatabase
SECRET_KEY=your_secret_key
```

## Run Locally

Clone this repository to your local machine:

```bash
  git clone https://github.com/beharavenkatasatyaprasad/user-authentication-and-authorization-using-koa.git
```

Go to the project directory

```bash
  cd user-authentication-and-authorization-using-koa
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

The server will run on http://localhost:8000.

## API Reference

#### 1. index route

```http
  GET /
```

returns "hello world!".

#### 2. User Registration

URL:

```http
  POST /signup
```

Request Body:

| Parameter  | Type     | Description                                                                                             |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------ |
| `username` | `string` | **Required**. The username of the user. (Provide the user's chosen username for registration or login.) |
| `password` | `string` | **Required**. The user's password. (Provide the user's chosen password for registration or login.)      |

Response:

| Parameter | Type     | Description                                                                                                                                                    |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`   | `string` | **Required**. The JWT token generated upon successful user registration. (The token should be included in the request headers for accessing protected routes.) |

#### 3. User Login

URL:

```http
  POST /login
```

Request Body:

| Parameter  | Type     | Description                                                                                             |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------ |
| `username` | `string` | **Required**. The username of the user. (Provide the user's chosen username for registration or login.) |
| `password` | `string` | **Required**. The user's password. (Provide the user's chosen password for registration or login.)      |

Response:

| Parameter | Type     | Description                                                                                                                                             |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `token`   | `string` | **Required**. The JWT token generated upon successful user login. (The token should be included in the request headers for accessing protected routes.) |

#### 4. Protected Route

URL:

```http
  POST /protected
```

Request Header:

```http
  Authorization: Bearer your_generated_jwt_token
```

Response:

```json
{
  "message": "Hello your_username! This is a protected route."
}
```

Happy coding! 🚀