import toast from 'react-hot-toast'
// import { authenticate } from './helper'
// validate login page username 
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    // if (values.username) {
    //     // check user exist or not
    //     const { status } = await authenticate(values.username);

    //     if (status !== 200) {
    //         errors.exist = toast.error('User does not exist...!')
    //     }
    // }


    return errors;
}





//validate username

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}


export function passwordValidate(values) {
    const errors = passwordVerify({}, values);



    return errors;
}




//validate password

function passwordVerify(errors = {}, values) {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required...!");
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 characters long");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}

function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}