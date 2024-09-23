const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Secret key for JWT
const SECRET_KEY = 'vishnu';
// Sample user data (for demonstration only)
const users = [{ id: 1, username: 'user', password: 'pass' }];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check user credentials (this should be replaced with a database check)
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Create a token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    return res.status(401).send('Invalid credentials');
});
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; // Save user info for later use
      next();
  });
};
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.username}, this is a protected route!`);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

