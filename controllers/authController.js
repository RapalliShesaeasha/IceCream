import User from '../models/User.js';

// Handle user signup
export const signup = async (req, res) => {
  const { username, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, phoneNumber, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'Successfully Signed up' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Handle user login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
