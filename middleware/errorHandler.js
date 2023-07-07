export const customErrorhandler = (err, req, res, next) => {
  const statuscode = err.statuscode || 400
  res.status(statuscode).json({
    message: err.message,
    stack: process.env.NODE_ENV == 'production' ? null : err.stack
  })
}

export const invalidPathHandler = (req, res, next) => {
  let error = new Error("Invalid Path")
  error.statuscode = 404
  next(error)
}