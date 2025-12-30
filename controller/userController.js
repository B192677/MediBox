const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require("../model/user");

// 
// GET USER
//
exports.getUser = (req, res) => {
  res.status(200).json({ message: "success" });
};

//
// REGISTER USER
//
exports.registerUser = async (req, res) => {
  const { name, email, password, gender, mobile } = req.body;
  const hashPwd = await hash(password, 12);
  const newUser = new User({
    name,
    email,
    password: hashPwd,
    gender,
    mobile,
  });

  await newUser.save();
  res.status(201).json({ message: "success", newUser });
};

// 
//  LOGIN USER
// 
exports.LoginByUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new Error("email is required field");
  }
  if (!password) {
    throw new Error("password must be there");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User does not exist");
  }
  console.log("User Requested", user);
  const userVerified = await compare(password, user.password);
  if (!userVerified) {
    return res.status(200).json({ message: "password does not match" });
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: "10m" }
  );
  
  res.status(200).json({
    message: "Successfully LoggedIn",
    accessToken,
    User: { UserId: user._id, name: user.name, email: user.email },
  });
};

// GET USER DETAILS
exports.getUserDetails = async (req,res) => {
  try {
    const {user_id} = req.body;
    const user = await User.findById(user_id)
    return res.status(200).json({user:user})
  }catch(error){
        res.status(500).json({ error: error.message || "Failed to Fetch user" });

  }
}

//
//  ADD TO CART
// 
exports.addToCart = async (req, res) => {
  try {
    const { products, user_id } = req.body;
    console.log(products)
    // user_id = _id
    // if(products.length()>0){
    const user = await  User.findOneAndUpdate({_id:user_id},{cart: products.map(p => ({productId: p.id, quantity: p.quantity,PriceInclTaxes:p.PriceInclTaxes
}))},{new:true})
    if(!user){
      return res.status(404).json({error:"User Not Found"})
    }
    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message || "Add to cart failed" });
  }
};

// 
// ADD TO WISHLIST
// 
exports.addToWishlist = async (req, res) => {
  try {
    const { productId,_id } = req.body;
    const user = await User.findById(_id); // ✅ FIXED

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }

    await user.save();
    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message || "Add to wishlist failed" });
  }
};

/*exports.addToWishlist = async (req, res) => {
  try {
    const { productId,_id } = req.body;
    const user = await User.find(); // ✅ FIXED

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }

    await user.save();
    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message || "Add to wishlist failed" });
  }
};*/


exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Email', email);
  // validate email input
  if (!email || typeof email !== "string") {
    return res.status(400).json({ msg: "Email is required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    const nodemailer = require('nodemailer');

    if (!user) {
      return res.status(404).json({ msg: "User not exists" });
    }

    const token = jwt.sign({ email: normalizedEmail }, process.env.JWT_SECRET || "NO_SECRET", { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/Reset`;

    // Use env SMTP credentials if set, otherwise return the link (dev mode)
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
     rejectUnauthorized: false, 
  },
      });

      const mailOptions = {
        from: smtpUser,
        to: normalizedEmail,
        subject: "Reset Your Password",
        text: `Click the link to reset your Password : ${resetLink}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Mail sent: ", info.response);
      return res.status(200).json({ status: "Success", msg: "Reset email sent" });
    } else {
      console.warn("SMTP not configured. Returning reset link in response (dev mode).");
      return res.status(200).json({ status: "Success", msg: "Reset link (dev)", link: resetLink });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

//RESET PASSSWORD

exports.ResetPassword = async (req, res) => {
   try {
    console.log('In backend reset');
    const bcrypt = require('bcrypt');
      const { password,email } = req.body;
      console.log("Updating User with:", { password });
      console.log("email",email);
      const normalizedEmail = email.trim().replace(/^"|"$/g, '').toLowerCase();
      console.log(`Email received: >${email}<`);
      const hashPwd = await bcrypt.hash(password, 12);
      const result = await User.findOneAndUpdate(
            { email: normalizedEmail  },       // Filter 
            { $set: {password:hashPwd} },
            {new : true}       // Update
          );
      console.log("result", result);
    //    if (!result) {
    //   return res.status(404).json({ msg: "User not found" });
    // }

      res.status(200).json({ msg: "Password reset successful", user: result });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        message: "Failed to update product",
        error: error.message,
      });
    }
};



// Toggle wishlist add/remove product for user
/*exports.toggleWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ message: "Missing productId or userId" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      message: "Wishlist updated",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res
      .status(500)
      .json({ message: "Failed to update wishlist", error: error.message });
  }
};*/












//



// Toggle wishlist add/remove product for user
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId)
      return res.status(400).json({ message: "Missing productId or userId" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.wishlist.findIndex((id) => id.toString() === productId);
    if (index === -1) user.wishlist.push(productId);
    else user.wishlist.splice(index, 1);

    await user.save();

    res.status(200).json({
      message: "Wishlist updated",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update wishlist", error: error.message });
  }
};

// Get wishlist for user
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const user = await User.findById(userId).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

