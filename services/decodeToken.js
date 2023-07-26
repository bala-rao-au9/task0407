const jwt = require("jsonwebtoken");

exports.decodeToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  let tokenData = null;
  // Verify the access token and decode its payload
  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      // Handle token verification error
      console.error("Token verification failed:", err.message);
    } else {
      tokenData = decodedToken;
    }
  });
  return tokenData;
};
