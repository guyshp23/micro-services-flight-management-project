/* eslint-disable jsx-a11y/anchor-is-valid */

import { withFormik, Form, Field } from "formik";
import Yup from "yup";
import classNames from "classnames";


const RegisterForm = (() => {

    const MyForm = ({ values, errors, touched, isSubmitting }) => {
        return(
            <Form className="mt-6">
            <div className="mb-2">
                <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Username
                </label>
                <Field
                    type="text"
                    name="username"
                    id="username"
                    className={classNames({
                    "form-control": true,
                    "is-valid":   touched.username && !errors.username,
                    "is-invalid": touched.username && errors.username
                    })}
                    type="username"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md text-sky-700 focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Email
                </label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                    className={classNames({
                        "form-control": true,
                        "is-valid": touched.email && !errors.email,
                        "is-invalid": touched.email && errors.email
                    })}
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md text-sky-700 focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Password
                </label>
                <Field
                    className={classNames({
                        "form-control": true,
                        "is-valid": touched.password && !errors.password,
                        "is-invalid": touched.password && errors.password
                    })}
                    id="password"
                    type="password"
                    name="password"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md text-sky-700 focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="confirm_password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md text-sky-700 focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-sky-500 hover:bg-sky-400 focus:ring-4 focus:ring-sky-200 focus:outline-none focus:bg-sky-400">
                    Register
                </button>
            </div>
        </Form>
        )
    }
    
const FormikForm = withFormik({
    mapPropsToValues({ email, password, newsletter, plan, terms }) {
      return {
        email: email || "",
        password: password || "",
        newsletter: newsletter || false,
        plan: plan || "free",
        terms: terms || false
      };
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
      password: Yup.string()
        .min(9, "Password must be 9 characters or longer")
        .required("Password is required"),
      terms: Yup.boolean().oneOf([true], "Must Accept Terms and Conditions")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      console.log(values);
      setTimeout(() => {
        if (values.email === "arnaud@test.io") {
          setErrors({ email: "That email is already taken" });
        } else {
          resetForm();
        }
        setSubmitting(false);
      }, 2000);
    }
  })(MyForm);

    return (
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                        <h1 className="text-4xl font-semibold text-center text-sky-500">
                           Register
                        </h1>
                        <MyForm />        
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-sky-600 hover:underline"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

export default RegisterForm;