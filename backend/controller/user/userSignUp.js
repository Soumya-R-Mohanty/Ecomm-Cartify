const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ name });
    if (user) {
      throw new Error("User Already Exist");
    }

    console.log(req.body);

    if (!name) {
      throw new Error("Please provide name");
    }

    if (!email) {
      throw new Error("please provide email");
    }

    if (!password) {
      throw new Error("Please provide the password");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      role:"GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUpController;
