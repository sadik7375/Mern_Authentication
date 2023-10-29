
import { Link, useNavigate } from 'react-router-dom'
import ws from '../assets/ws.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import axios from 'axios';
// import { usernameValidate } from '../helper/validate'
import { registerUser } from '../helper/helper'
const Register = () => {

  const navigate=useNavigate();



    const formik = useFormik({
        initialValues : {
          email: '',
          username: '',
          password : ''
        },
        validate : registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
          values = await Object.assign(values)
          let registerPromise = registerUser(values)
          toast.promise(registerPromise, {
            loading: 'Creating...',
            success : <b>Register Successfully...!</b>,
            error : <b>Could not Register.</b>
          });
    
          registerPromise.then(function(){ navigate('/')});
        }
      })
  


//<-----------------------validate.js file------------------->




//validate password

function passwordVerify(errors = {}, values) {
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

  return errors;
  
}

async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}



//<-----------------------validate.js file finish------------------->
//<-------------------serverside validation------------------------->
 async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/signup`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}
//<-------------------serverside validation end------------------------->

    return (
        <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Join with US</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Welcome to our community
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit} >
            <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={ ws} className={styles.profile_img} alt="avatar" />
                  </label>
                  
                  <input  type="file" id='profile' name='profile' />
              </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('email')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='email' />
                    <input {...formik.getFieldProps('username')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='username' />
                    <input {...formik.getFieldProps('password')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='Password' />
                    <button className="block cursor-pointer w-1/2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'> create Account</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Already Registered <Link className='text-red-500 no-underline ' to="/">Sign in</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
       
    );
};

export default Register;