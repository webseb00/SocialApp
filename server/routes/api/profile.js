const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route GET   api/profile/me
// @description test route

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await (await Profile.findOne({ user: req.user.id })).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is not profile for this user' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook
  } = req.body;

});

module.exports = router;
