import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists or not
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    user = await User.create({ name, email, password });

    console.log('user: ', user);

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
    console.log('error: ', error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
