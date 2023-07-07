import pkg from 'jsonwebtoken';
const { verify } = pkg;
import User from "../models/User.js";

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const authGuard = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log('token: ', token);
      console.log(parseJwt(token))
      const decoded = await verify(token, process.env.JWT_SECRET, {
        complete: true,
      })
      console.log('decoded: ', decoded);
      
      req.user = await User.findById(id).select('-password ')
      next()
    } catch (error) {
      let err = new Error("Authorization Failed")
      err.statusCode = 401
      next(err)
    }
  } else {
    let err = new Error("Unauthorization token!")
    err.statusCode = 401
    next(err)
  }
}