import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

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
      token: await user.generateJWT(user?._id)
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
        token: await user.generateJWT(user?._id)
      });
    } else {
      throw new Error("wrong password");
    }
  } catch (error) {
    next(error)
  }
}

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user?._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
      });
    }
    throw new Error('data not found')
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("user not found")
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password < 6) {
      throw new Error("Password length must be 6 character")
    } else if (req.body.password) {
      user.password = req.body.password
    }
    const udpateduserProfile = await user.save();
    return res.status(201).json(udpateduserProfile)
  } catch (error) {
    next(error)
  }
}

export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("avatar")
    upload(req, res, async function (err) {
      if (err) {
        return next(new Error("An error occurred while uploading an image"));
      } else {
        if (req.file) {
          const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            avatar: req.file.filename
          }, { new: true })
          return res.json(updatedUser)
        }
        else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json(updatedUser);
        }
      }
    })
  } catch (error) {
    console.log('error: ', error);
    next(error)
  }
}
