const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StoreAdmin = require("../models/storeAdmin.model");

exports.login = async (req, res) => {
  let result = {};
  try {
    const { email, password } = req.body;

    await StoreAdmin.findOne({ email }, (err, storeAdmin) => {
      console.log("storeAdmin", storeAdmin);
      if (err) {
        result.error = `User doesn't exist, please register as an admin, ${err}`;
        return res.send(result);
      }
      bcrypt.compare(password, storeAdmin?.password).then((match, err) => {
        if (match) {
          const payload = {
            email,
            role: "admin",
          };
          const options = {
            expiresIn: "30d",
            issuer: "https://cloudmall.africa",
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);
          if (token) result.token = token;
          result.message = "login successful, logged in as an admin";
          result.data = storeAdmin;
          return res.send(result);
        } else {
          return res.status(400).send({ err, message: "wrong credentials !" });
        }
      });
    });
  } catch (error) {
    console.error("error", error);
    res.send(error);
  }
};
