import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cassandra from "cassandra-driver";

const app = express();
app.use(express.json()); // for parsing application/json

// Cassandra client setup
const client = new cassandra.Client({
  contactPoints: ['10.89.0.2'], // Update with actual IP
  localDataCenter: 'datacenter1',
  keyspace: 'shop'
});


// JWT Secret Key (use an environment variable in production)
const JWT_SECRET = 'prod_key';

// Create a new user (Sign Up)
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if email already exists
  const query = 'SELECT * FROM users WHERE email = ?';
  try {
    const result = await client.execute(query, [email], { prepare: true });

    if (result.rowLength > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into Cassandra DB
    const insertQuery = 'INSERT INTO users (id, email, password) VALUES (uuid(), ?, ?)';
    await client.execute(insertQuery, [email, hashedPassword], { prepare: true });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Fetch user from DB
  const query = 'SELECT * FROM users WHERE email = ?';
  try {
    const result = await client.execute(query, [email], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
