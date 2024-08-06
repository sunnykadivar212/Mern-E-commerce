const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login...",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("error auth==>>", err);
        return res.status(401).json({
          message: "Invalid token. Please login again.",
          error: true,
          success: false
        });
      }

      console.log("decoded==>>", decoded);
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
