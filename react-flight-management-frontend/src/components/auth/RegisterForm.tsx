import React from "react";
import { Formik, Form } from "formik";
import { object, ref, string } from "yup";
import { Input } from "../Input";
import Register from "../../pages/api/auth/register";
import Login from "../../pages/api/auth/login";
import { Link } from "react-router-dom";

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
  const handleSubmit = async (values: any) => {
    console.debug('Values from registerForm', values);
    await Register(values.username, values.email, values.password);
    await Login(values.username, values.password).then(() => {
        // redirect in a different way here
        window.location.href = "/";
    })
  };

  return (
      <Formik
        initialValues={{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidation}
      >
        {() => {
          return (
            <Form className="bg-white w-full shadow-lg rounded px-8 pt-6 pb-8">
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
  );
}

export default RegisterForm;
