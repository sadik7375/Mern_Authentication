
import { Link, useNavigate } from 'react-router-dom'
import ws from '../assets/ws.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'

import { usernameValidate } from '../helper/validates'
import { useAuthStore } from '../store/store'

const Username = () => {

  const navigate = useNavigate();

  const setUsername = useAuthStore(state => state.setUsername);

const formik=useFormik(
{
initialValues:{
    username:''
},
validate:usernameValidate,
validateOnBlur:false,
validateOnChange:false,
onSubmit:async (values)=>{
  setUsername(values.username);
  navigate('/password')
}

})


//<---------------validate.js file function-------------> 
 




//<---------------validate.js file function finish------------->

    return (
        <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Hello Again!</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore More by connecting with us.
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit} >
                <div className='profile flex justify-center py-4'>
                    <img src={ws} className={styles.profile_img} alt="avatar" />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('username')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder='Username' />
                    <button className="block cursor-pointer w-1/2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'> Go</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Not a Member <Link className='text-red-500 no-underline ' to="/register">Register Now</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
       
    );
};

export default Username;