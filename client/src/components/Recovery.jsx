import { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
// import { usernameValidate } from '../helper/validate'
import { useAuthStore } from  '../store/store'

import { generateOTP, verifyOTP } from '../helper/helper';


const Recovery = () => {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }
 
  
 return (
        <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Recovery</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore More by connecting with us.
              </span>
            </div>
  
            <form className='py-1' onSubmit={onSubmit} >
            <div className="input text-center">
                   
                   <span className='py-4 pb-4 text-sm text-left text-gray-500'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                   
                    <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                  <div className='pt-3'> <button className="block cursor-pointer w-1/2  max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'>Recovery</button></div> 
                  </div>

  
             
  
              
  
            </form  >
            <div className="text-center py-4">
            <span className='text-gray-500'>Cannot get OTP? <button onClick={resendOTP} className='text-red-500 cursor-pointer'>Resend</button></span>
          </div>
  
          </div>
        </div>
      </div>
       
    );
};

export default Recovery;