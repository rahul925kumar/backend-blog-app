import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
const sign = jwt.sign;
const UserSchema = new Schema({
  avatar: { type: String, default: "" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, required: false },
  admin: { type: Boolean, required: false },
}, { timestamps: true })


// Method for password hashing before save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

// Method for token

UserSchema.methods.generateJWT = async () => {
  return await sign({ id: this?._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

//Compare password

UserSchema.methods.comparePassword = async (user, enterPassword) => {
  return await compare(enterPassword, user.password) //here compare function return promise so wee need to use a await
}

const User = model("users", UserSchema);
export default User;