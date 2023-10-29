
import { Link, useNavigate } from 'react-router-dom'
import ws from '../assets/ws.png'
import styles from '../styles/Username.module.css'

import { useFormik } from 'formik'
import useFetch from '../hooks/fetch.hook';
import { passwordValidate } from '../helper/validates'
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import toast, { Toaster } from 'react-hot-toast';


const Password = () => {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    
    }
  });
  

  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
//<-----------------------validate.js file------------------->



//<-----------------------validate.js file finish------------------->


    return (
        <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
            {/* <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4> */}
          
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore More by connecting with us.
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit} >
                <div className='profile flex justify-center py-4'>
                    <img src={ws} className={styles.profile_img} alt="avatar" />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('password')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='Password' />
                    <button className="block cursor-pointer w-1/2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'> Go</button>
                </div>
  
                <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
                </div>
                   
            </form>
  
          </div>
        </div>
      </div>
       
    );
};

export default Password;