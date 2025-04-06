const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
    };

    const authToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("authToken", authToken, { httpOnly: true, secure: true });
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };
