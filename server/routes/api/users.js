const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route GET   api/users
// @description test route

router.post('/', [
  check('name', 'Name is requried!').not().isEmpty(),
  check('email', 'Please include a valid email!').isEmail(),
  check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).res.json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if(err) throw err;
        res.json({token});
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }

  

  // see if user exists

  // get users gravatar

  // encrypt password

  // return jsonwebtoken
});

module.exports = router;
