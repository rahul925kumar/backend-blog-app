import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { customErrorhandler, invalidPathHandler } from "./middleware/errorHandler.js";
//Routes
import userRoute from "./routes/userRoute.js"

dotenv.config()
connectDB();
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Server is running....")
})

app.use('/api/user', userRoute)
app.use(customErrorhandler)
app.use(invalidPathHandler)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server is running...."))