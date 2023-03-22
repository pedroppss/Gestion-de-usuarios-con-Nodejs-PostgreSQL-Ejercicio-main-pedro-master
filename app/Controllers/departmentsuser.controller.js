const db=require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.users;

//registering a user
//hash the users password before it is saved to the database with bcrypt
const signup = async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const data = {
        userName,
        email,
        password: await bcrypt.hash(password, 10),
      };
      //saving the user
      const user = await User.create(data);
   
      //if user details are captured
      //generate token with user id and secret key in env file
      // set cookie with generated token
      if (user) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
   
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //Send user details
        return res.status(201).send(user);
      } else {
        return res.status(409).send("details are not correct");
      }
    } catch (error) {
      console.log(error);
    }
   };
   
   
   //login authentication
   
   const login = async (req, res) => {
    try {
   const { email, password } = req.body;
   
      //Find a user by their email
      const user = await User.findOne({
        where: {
        email: email
      } 
        
      });
   
      //if the user's email is found, check the password against bcrypt
      if (user) {
        const isSame = await bcrypt.compare(password, user.password);
   
       //if password is same generate token with user id and secret key in env file
   
        if (isSame) {
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
   
          //if the password matches the one in the database, go ahead and generate a cookie for the userres.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);
          //send user data
          return res.status(201).send(user);
        } else {
          return res.status(401).send("failed authentication");
        }
      } else {
        return res.status(401).send("failed authentication");
      }
    } catch (error) {
      console.log(error);
    }
   };
   
   module.exports = {
    signup,
    login,
   };