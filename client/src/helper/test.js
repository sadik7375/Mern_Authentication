import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    axios.post('http://localhost:8000/api/signup', values)
      .then((result) => {
        console.log(result);
        navigate('/signin');
        toast.success('Signup successful!');
      })
      .catch((error) => {
        console.error('API Error:', error);
        toast.error('Signup failed. Please try again.');
      });
  };

  return (
    <div>
      {/* ... (your existing code) ... */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validate={(values) => {
            const errors = {};

            if (!values.name.trim()) {
              errors.name = 'Fullname is required';
            }

            if (!values.email.trim()) {
              errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = 'Invalid email address';
            }

            if (!values.password.trim()) {
              errors.password = 'Password is required';
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Fullname</label>
              <div className="mt-2">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
              </div>
            </div>

            {/* Similar changes for email and password fields */}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </Form>
        </Formik>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?
          <Link to="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
