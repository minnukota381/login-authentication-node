# Login Authentication

This project is a web application built with Node.js that implements user authentication features including registration, login, password reset, and logout functionalities. The application uses Express.js for the backend server and MongoDB as the database to store user information securely.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration**: Allows new users to create an account.
- **User Login**: Existing users can log in with their credentials.
- **Password Reset**: Users can reset their password if they forget it.
- **Password Change**: Users can change their password.
- **Logout**: Users can log out of their account securely.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user information.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **bcryptjs**: Library to hash and compare passwords.
- **EJS**: Embedded JavaScript templates for rendering HTML pages.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/minnukota381/login-authentication-node.git
    cd login-authentication-node
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGODB_URI=<your-mongodb-connection-string>
    PORT=3000
    ```

4. **Start the server**:
    ```sh
    npm start
    ```
    The server will start running on `http://localhost:3000`.

## Usage

1. **Register a new user**:
    - Navigate to `http://localhost:3000/register`.
    - Fill in the registration form and submit.

2. **Login**:
    - Navigate to `http://localhost:3000/`.
    - Enter your username/email and password to log in.

3. **Forgot Password**:
    - Navigate to `http://localhost:3000/forgot-password`.
    - Enter your username and email to receive a password reset link.

4. **Reset Password**:
    - Navigate to the link received in your email.
    - Enter your new password to reset.

## Folder Structure

```
login-authentication-node/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── forgot-password.ejs
│   └── reset-password.ejs
├── public/
│   └── css/
│       └── login.css
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Routes

- **GET /**: Render the login page.
- **POST /login**: Handle user login.
- **GET /register**: Render the registration page.
- **POST /register**: Handle user registration.
- **POST /logout**: Handle user logout.
- **GET /forgot-password**: Render the forgot password page.
- **POST /forgot-password**: Handle forgot password form submission.
- **GET /reset-password**: Render the reset password page.
- **POST /reset-password**: Handle reset password form submission.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.