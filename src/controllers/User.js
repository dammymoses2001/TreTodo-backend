const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

//this end points are for signing in user and signing up user
exports.userSignIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: err,
            });
        }
        if (user) {
            const isVaild = await bcryptjs.compareSync(req.body.password, user.hash_password)
            // console.log(password)
            if (isVaild) {

                const { _id, email, username, profilePic } = user;
                const userData = {
                    email, username, profilePic
                }
                const token = jwt.sign(
                    { _id: _id, email: email, username: username },
                    process.env.JWT_SECERTKEY,
                    {
                        expiresIn: '2days',

                    }
                );
                res.cookie('token', token, { expiresIn: '1hr' })
                // const { _id, email, fullName, firstName, LastName, role } = user;
                return res.status(200).json({
                    token,
                    userData
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid Credentails',
                });
            }
        } else {
            return res.status(400).json({
                message: 'Invalid Credentails',
            });
        }
    });
    // const { email, password } = req.body;
    // User.findOne({ email }).exec((err, user) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     if (user) {
    //         if (user.authenticate(password)) {
    //             res.status(200).json({
    //                 message: user.authenticate(password)
    //             })
    //         }
    //         return res.status(400).json({
    //             message: "wrong Credentials"
    //         })
    //     }
    //     return res.status(400).json({
    //         message: "wrong Credentials"
    //     })
    // })

}

exports.userSignUp = (req, res) => {
    const { email, username, password } = req.body;

    User.findOne({ email }).exec(async (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user) {
            res.status(400).json({
                message: 'User already exist'
            })
        }
        const hash_password = await bcryptjs.hashSync(password)
        const _user = new User({
            email,
            hash_password,
            username
        })
        if (req.file) {
            _user.profilePic =
                process.env.API + '/public/' + req.file.filename;
        }

        _user.save((err, newUser) => {
            if (err) {
                console.log(err)
            }

            if (newUser) {
                res.status(201).json({
                    message: 'User created Successfully'
                })
            }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully....'
    })
}