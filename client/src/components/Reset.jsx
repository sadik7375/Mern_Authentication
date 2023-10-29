
import { Link, useNavigate,Navigate } from 'react-router-dom'
import ws from '../assets/ws.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store';

import useFetch from '../hooks/fetch.hook'
// import { usernameValidate } from '../helper/validate'

const Reset = () => {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')









  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/password') })
    }
  });
  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  // if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>


//<-----------------------validate.js file------------------->

function passwordValidate(values) {
  const errors = passwordVerify({}, values);



  return errors;
}




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

//<-----------------------validate.js file finish------------------->


    return (
        <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Reset</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
               Enter New Passsword
              </span>
            </div>
  
            <form className='py-4' onSubmit={formik.handleSubmit} >
                
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('password')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='New Password' />
                    <button className="block cursor-pointer w-1/2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'> Go</button>
                </div>
  
               
  
            </form>
  
          </div>
        </div>
      </div>
       
    );
};

export default Reset;