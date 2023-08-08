import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authGuard = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const id = decoded.id; // Assuming your JWT payload has a field named "userId"
        req.user = await User.findById(id).select('-password ')
        next()
      } catch (err) {
        console.error("JWT Verification Error:", err.message);
      }
    } catch (error) {
      let err = new Error("Authorization Failed")
      err.statusCode = 401
      next(err)
    }
  } else {
    let err = new Error("Unauthorized token!")
    err.statusCode = 401
    next(err)
  }
}