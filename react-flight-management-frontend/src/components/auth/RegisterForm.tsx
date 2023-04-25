import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { object, ref, string } from "yup";
import { Input } from "../Input";
import Register from "../../pages/api/auth/register";
import Login from "../../pages/api/auth/login";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http, { isAuthenticted } from "../../pages/api/http";
import getUserDetails from "../../pages/api/auth/getUserDetails";
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from "../../state";

const RegisterValidation = object().shape({
  username: string()
            .required("A username is required")
            .min(3, "Must be at least 3 characters"),

  email: string()
        .required("An email is required")
        .email("Valid email required"),

  password: string()
            .required("A password is required")
            .min(8, "Must be at least 8 characters"),

  confirm_password: string()
                    .required("This field is required")
                    .min(8, "Must be at least 8 characters")
                    .oneOf([ref('password')], 'Passwords must match'),
});


function RegisterForm() {
  const navigate = useNavigate();
  const updateUserData = useStoreActions((actions: Actions<ApplicationStore>) => actions.user.updateUserData);


  useEffect(() => {
    
    if (isAuthenticted()) {
      navigate('/')
    }
  
  }, [navigate])
  

  
  const handleSubmit = async (values: any) => {
    console.debug('Values from registerForm', values);

    await Register(values.username, values.email, values.password)
    .catch((err) => {

        const errorMessage = err.response.data.detail 
                              || err.response.data.custom_message 
                              || err.response.data.message;

        console.error(err);
        toast.error(`Register failed! ${errorMessage}`, {
          position: "top-right",
          autoClose: 7500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });          
    })
    .then( async (res) => {

      await Login(values.username, values.password).then(async (r) => {

          // Set recieved tokens in local storage
          localStorage.setItem("access_token",  r.access);
          localStorage.setItem("refresh_token", r.refresh);

          http.defaults.headers['Authorization'] = "Bearer " + r.access;


          console.debug('logging in...');
          console.debug('response of login request:', r);

          // Get user details
          await getUserDetails().then(async (r) => {
            console.debug('User details response:', r);

            // Save in redux state using easy-peasy
            updateUserData(r);
            
          })

          // Redirect to home page using react-router-dom
          navigate('/')

      })
      .catch((err) => {
          console.error(err);
          toast.error(`Login failed! ${err.response.data.detail}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });          
      })
    })

  };

  return (
    <>
      <ToastContainer />
        <Formik
          initialValues={{
              username: "admin4",
              email:    "admin4@admin.com",
              password: "admin1234",
              confirm_password: "admin1234",
          }}
          onSubmit={handleSubmit}
          validationSchema={RegisterValidation}
        >
          {() => {
            return (
              <Form className="bg-white w-full shadow-lg rounded px-16 pt-6 pb-8">
                  <h1 className="text-4xl font-semibold text-center text-sky-500">
                      Register
                  </h1>
                  <div className='mt-6'>
                      <Input name="username" label="Username" />
                      <Input name="email"    label="Email" />
                      <Input name="password" label="Password" type="password" />
                      <Input name="confirm_password" label="Confirm Password" type="password" />
                      <div className="flex items-center justify-center">
                          <button
                            className="bg-sky-500 hover:bg-sky-600 shadow-sm hover:shadow-md focus:ring-4 focus:ring-sky-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                          Register
                          </button>
                      </div>
                  </div>
                  <p className="mt-8 text-xs font-light text-center text-gray-700">
                      {" "}
                      Already have an account?{" "}
                      <Link
                          to="/login"
                          className="font-medium text-sky-600 hover:underline"
                      >
                          Login
                      </Link>
                  </p>
              </Form>
            );
          }}
        </Formik>
      </>
  );
}

export default RegisterForm;
