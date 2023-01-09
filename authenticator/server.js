const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// Replace this with your own database connection
const users = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: '$2a$12$ms9sW0QYMdHQkeZTSmC6du0uqijhUgbKrn0Dap6GBkBfF7aMDyk5W' // password: password1
  },
  {
    id: 2,
    email: 'user2@gmail.com',
    password: '$2a$12$ms9sW0QYMdHQkeZTSmC6du0uqijhUgbKrn0Dap6GBkBfF7aMDyk5W' // password: password1
  }
];

const secretKey = 'eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jbDY1NzN9';

const refreshTokens = [];

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = users.find(u => u.email === email);

  // If the user doesn't exist, return an error
  if (!user) {
    return res.status(400).send({ error: 'Invalid login' });
  }
  

  // Check the password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Error while trying to login' });
    }

    // If the password is correct, return the user object
    if (result) {
      // const refreshToken = nanoid();
      const refreshToken = "$2a$12$ms9sW0QYMdHQkeZTSmC6du0uqijhUgbKrn0Dap6GBkBfF7aMDyk5W";
      refreshTokens.push(refreshToken);
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey);

      // Set a cookie with the user's ID and a JWT token
      res.cookie('user', user.id, { httpOnly: true });
      res.cookie('token', token, { httpOnly: true });

      return res.send({ token, refreshToken });
    }
    // If the password is incorrect, return an error
    return res.status(400).send({ error: 'Invalid login' });
  });
});

app.listen(8000, () => console.log('Listening on port 8000'));
