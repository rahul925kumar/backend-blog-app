import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists or not
    let user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already registered");
    }

    user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user?._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      password: user.password,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT()
    });
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email is not registered");
    }
    if (await user.comparePassword(user, password)) {
      return res.status(201).json({
        _id: user?._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT()
      });
    } else {
      throw new Error("wrong password");
    }
  } catch (error) {
    next(error)
  }
}
