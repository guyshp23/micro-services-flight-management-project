/* eslint-disable jsx-a11y/anchor-is-valid */
const LoginForm = () => {

    return (
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                        <h1 className="text-4xl font-semibold text-center text-sky-500">
                           Login
                        </h1>
                        <form className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <a
                                href="/forgot"
                                className="text-xs text-sky-600 hover:underline"
                            >
                                Forget Password?
                            </a>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-400 focus:ring-4 focus:ring-sky-200 focus:outline-none focus:bg-sky-400">
                                    Login
                                </button>
                            </div>
                        </form>
        
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="font-medium text-sky-600 hover:underline"
                            >
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

export default LoginForm;