
import React, { useState } from 'react'
import ws from '../assets/ws.png'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validates';

import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';

const Register = () => {

  const navigate=useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();


  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, )
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })
    
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }  


//<-----------------------validate.js file------------------->

// if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
// if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>






//<-----------------------validate.js file------------------->
    return (
        <div className="container mx-auto">

        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen w-full'>
          <div className={`${styles.glass}`} style={{ width: "45%", paddingTop: '3em'}}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Profile</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                  You can update the details.
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <label htmlFor="profile">
                      <img src={ws} className={`${styles.profile_img} `} alt="avatar" />
                    </label>
                    
                    <input  type="file" id='profile' name='profile' />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                  <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('firstName')} className="w-16 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"  type="text" placeholder='FirstName' />
                    <input {...formik.getFieldProps('lastName')} className="w-16 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"  type="text" placeholder='LastName' />
                  </div>
  
                  <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('mobile')} className="w-16 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"  type="text" placeholder='Mobile No.' />
                    <input {...formik.getFieldProps('email')} className="w-16 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"  type="text" placeholder='Email*' />
                  </div>
  
                 
                    {/* <input {...formik.getFieldProps('address')} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"  type="text" placeholder='Address' /> */}
                    <button className="block cursor-pointer w-3/4 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-1 py-1 font-semibold" type='submit'>Update</button>
                 
                    
                </div>
  
                <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>
  
            </form>
            <div className="text-center py-4">
                  <span className='text-gray-500'>come back later? <button  className='text-red-500 cursor-pointer rounded-lg  ' to="/">Logout</button></span>
                </div>
          </div>
        </div>
      </div>
       
    );
};

export default Register;