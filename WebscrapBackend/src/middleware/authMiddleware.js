require('dotenv').config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const SECRET_KEY = process.env.SECRET_KEY;  // Use environment variable
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;  // Use environment variable

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);  // Use environment variable

// Function to verify Google Token
async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Use environment variable
    });

    const payload = ticket.getPayload();
    return payload; // Returns Google user info (email, name, etc.)
  } catch (error) {
    console.error("Google Token Verification Error:", error.message);
    throw new Error("Invalid Google Token");
  }
}

// Middleware to verify token (JWT or Google Token)
const verifyToken = (req, res, next) => {
  // console.log("verifyToken Middleware");
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send("Authorization header is required");
  }

  const token = authHeader.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(403).send("Token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user data
    // console.log("Decoded Token:", decoded);
    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    }
    return res.status(401).send("Invalid Token");
  }
};

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

const refreshToken = (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ error: "Refresh token is required" });
    }

    jwt.verify(token, REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: "Invalid refresh token" });
      }

      const payload = { id: decoded.id, role: decoded.role };
      const { accessToken, refreshToken } = generateTokens(payload);

      res.status(200).send({
        message: "Access token refreshed successfully!",
        accessToken,
        refreshToken,
      });
    });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error in Refresh Token" });
  }
};

module.exports = { verifyToken, refreshToken, generateTokens, verifyGoogleToken };
