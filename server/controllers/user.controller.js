const User = require('../models/user');
const cuid = require('cuid');
const bcrypt = require('bcrypt'); 
const sanitizeHtml = require('sanitize-html');
const jwt = require('jsonwebtoken');

/**
 * Sign up
 * @param req
 * @param res
 * @returns void
 */
 signUp = async (req, res) => {
    if (!req.body.user.name || !req.body.user.password || !req.body.user.email) {
    
      res.status(403).end();
    }
    //Don't allow duplicated emails
    const isEmailExist = await User.findOne({ email: req.body.user.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'This email already exits'})
    }
    //Don't allow duplicated emails because is going to be the author
    const isNameExist = await User.findOne({ name: req.body.user.name });
    console.log(req.body.user.name)
    if (isNameExist) {
        return res.status(400).json({error: 'This user already exits'})
    }

    const newUser = new User(req.body.user);
    newUser.password = sanitizeHtml(newUser.password);
    
    //Password Hash
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    newUser.name = sanitizeHtml(newUser.name);
    newUser.email = sanitizeHtml(newUser.email);
    newUser.cuid = cuid();
    
    newUser.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ user: saved });
    });
  };

/**
 * Sign In a user
 * @param req
 * @param res
 * @returns void
 * Note: will be better to return only one error message like 'user or password wrong' 
 * to prevent reveal information 
 */
 signIn = async (req, res) => {

    const user = await User.findOne({ email: req.body.user.email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(req.body.user.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Wrong password' })
    
     // create token
     const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'secret')
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

    res.json({
        error: null,
        data: 'Login sucessfull'
    })
}

  module.exports = {
    signIn,
    signUp
  };
  