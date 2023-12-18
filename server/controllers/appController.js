const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const ENV = require('../config.js');
const otpGenerator = require('otp-generator');




async function verifyUser(req, res, next) {
    try {

        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}







async function signup(req, res) {
    try {
        const { username, password, email } = req.body;

        // const existUsername = new Promise((resolve, reject) => {
        //     UserModel.findOne({ username }, function(err, user) {
        //         if (err) reject(new Error(err))
        //         if (user) reject({ error: "Please use unique username" });

        //         resolve();
        //     })
        // });
        // const existEmail = new Promise((resolve, reject) => {
        //     UserModel.findOne({ email }, function(err, email) {
        //         if (err) reject(new Error(err))
        //         if (email) reject({ error: "Please use unique Email" });

        //         resolve();
        //     })
        // });

        // Promise.all([existUsername, existEmail])
        //     .then(() => {


        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({ error: "Internal Server Error1" });
            } else {
                // Create a new user with the hashed password
                const newUser = new UserModel({
                    username: username,
                    email: email,
                    password: hash,
                    // Store the hashed password in the database
                });

                // Save the user to the database
                newUser.save()
                    .then(() => {
                        res.json({ success: "User registered successfully" });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            }
        });




        // }).catch(error => {
        //     return res.status(500).send({
        //         error: "Enable to hashed password"
        //     })
        // })



    } catch (error) {
        return res.status(500).send({ error });
    }
}







async function login(req, res) {

    const { username, password } = req.body;

    try {

        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }




}
//put function
async function updateUser(req, res) {

    try {

        // const id = req.query.id;
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id: userId }, body, function(err, data) {
                if (err) throw err;

                return res.status(201).send({ msg: "Record Updated...!" });
            })

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

async function getUser(req, res) {
    const { username } = req.params;

    try {

        if (!username) return res.status(501).send({ error: "Invalid Username" });

        UserModel.findOne({ username }, function(err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}
//npm install otp generator
async function generateOTP(req, res) {

    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}
async function verifyOTP(req, res) {

    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

async function createResetSession(req, res) {

    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}

async function resetPassword(req, res) {

    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { username, password } = req.body;

        try {

            UserModel.findOne({ username })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username: user.username }, { password: hashedPassword }, function(err, data) {
                                if (err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg: "Record Updated...!" })
                            });
                        })
                        .catch(e => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error: "Username not Found" });
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

module.exports = { signup, login, updateUser, getUser, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser }