const { hash, compare } = require("bcrypt");
const { Admin } = require("../model/admin");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.getAdmin = (req, res) => {
  res.status(200).json({ message: "Success" });
};

exports.getRegisterByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPwd = await hash(password, 12);
    const newAdmin = new Admin({
      name,
      email,
      password: hashPwd,
      role,
    });
    await newAdmin.save();
    res.status(201).json({ message: "success", newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.LoginByAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required field" });
    }
    if (!password) {
      return res.status(400).json({ message: "password must be there" });
    }
    if (!role) {
      return res.status(400).json({ message: "role must be there" });
    }

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ message: "Admin does not exist" });
    }

    const userVerified = await compare(password, admin.password);
    if (!userVerified) {
      return res.status(400).json({ message: "password does not match" });
    }

    const accessToken = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Successfully LoggedIn",
      accessToken,
      Admin: {
        AdminId: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
