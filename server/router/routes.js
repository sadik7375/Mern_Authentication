const { Router } = require("express"); //Router class
const router = Router(); //Router class router object
const controller = require('../controllers/appController')
const { Auth, localVariables } = require('../middleware/auth')
const { signupMail } = require('../middleware/mailer')



//POST Methods
router.route('/signup').post(controller.signup);

router.route('/login').post(controller.verifyUser, controller.login); //login user
router.route('/authentication').post(controller.verifyUser, (req, res) => res.end()); //check authentication
router.route('/signupMail').post(signupMail); //send email




//GET Methods
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/user/:username').get(controller.getUser) // user data with username
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP



//PUT Methods
router.route('/updateuser').put(Auth, controller.updateUser); // update profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // password reset



module.exports = router;