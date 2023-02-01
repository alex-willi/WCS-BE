const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Associate = require("../models/associate");

const secret = process.env.JWT_SECRET || "🤐 🤫 🙈";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
const verify = async (jwt_payload, done) => {
  try {
    const associate = await Associate.findById(jwt_payload);
    return done(null, associate);
  } catch (err) {
    return done(err);
  }
};

const strategy = new Strategy(opts, verify);
passport.use(strategy);
passport.initialize();
const requireToken = passport.authenticate("jwt", { session: false });
const createAssociateToken = (req, associate) => {
  if (
    !associate ||
    !req.body.password ||
    !bcrypt.compareSync(req.body.password, associate.password)
  ) {
    const error = new Error("The provided email or password is incorrect");
    error.statusCode = 422;
    throw error;
  }
  return jwt.sign({ id: associate._id }, secret, { expiresIn: 36000 });
};
const handleValidateOwnership = (req, document) => {
  const ownerId = document.owner._id || document.owner;

  // Check if the current user is also the owner of the document

  if (!req.associate._id.equals(ownerId)) {
    throw Error("Unauthorized Access");
  } else {
    return document;
  }
};
module.exports = {
  requireToken,
  createAssociateToken,
  handleValidateOwnership,
};
