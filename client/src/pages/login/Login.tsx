import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiNightSky } from "react-icons/gi";
import { MdWbSunny } from "react-icons/md";
import { useThemeContext } from "../../hooks/useThemeContext";
import { m } from "framer-motion";
import { postService } from "../../services/apiServices";
import { LOGIN_API } from "../../constants/apiEndPoints";
import { setTokenCookie } from "../../services/cookieService";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUserData } from "../../redux/slices/authSlice";
import { AxiosResponse } from "axios";

interface FormValues {
    email: string;
    password: string;
}


interface UserData {
    token: string;
    userData: {
        firstName: string;
        lastName: string;
        isAuthorized: boolean;
        email: string;
    };
}

function Login(): JSX.Element {
    const [error, setError] = useState<string>('');
    const { theme, toggleTheme } = useThemeContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleThemeToggle() {
        toggleTheme();
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required("Email Address is required!"),
        password: Yup.string().required("Password is required!"),
    });

    const encryptPassword = (password: string): string => {
        const encryptedPassword = CryptoJS.AES.encrypt(password, import.meta.env.VITE_SECRET_PASS).toString();
        return encryptedPassword;
    };


    const handleLogin = async (values: FormValues): Promise<void> => {
        const { email, password } = values;
        setError('');
        try {
            const response = await postService(LOGIN_API, {
                email,
                password: encryptPassword(password)
            }) as AxiosResponse<UserData>;
            if (response?.data.token) {
                const { firstName, lastName, isAuthorized } = response.data.userData;
                setTokenCookie(response.data.token);
                dispatch(setIsLoggedIn(true));
                dispatch(setUserData({ firstName: firstName, lastName: lastName, isAuthorized: isAuthorized }));
                navigate('/')
            }
        } catch (error) {
            setError("Sorry, we couldn't verify your login information. Please try again.")
            console.log(error);
        }
    }

    return (
        <div className="page">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign in - PocketPal</title>
                <meta name="description" content="Signin to PocketPal to track your expenses" />
            </Helmet>
            <div className='min-h-[70vh] flex justify-center items-center'>
                <m.button
                    onClick={() => navigate("/")}
                    className="default-btn fixed top-3 left-3 w-max rounded-full text-lg p-3 px-5 dark:text-white dark:bg-[#ffffff20] bg-blue-100 text-indigo-600 hover:bg-blue-600 hover:text-white mx-1 flex justify-center items-center"
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 0.125,
                        type: 'spring'
                    }}
                >
                    <FaArrowLeftLong size={20} className="mr-3" /> Go Home
                </m.button>
                <button aria-label="theme toggle" title="Theme Toggler" className={`fixed right-3 top-3 p-3 mr-[-5px] rounded border-none bg-transparent dark:bg-transparent ${theme === 'light' ? 'hover:text-[#415086]' : 'hover:text-[#EBDCCD]'}`} onClick={handleThemeToggle}>
                    {
                        theme === 'light' ?
                            <GiNightSky size={30} className="text-indigo-900" />
                            : <MdWbSunny size={30} />
                    }
                </button>
                <div className="w-[280px] px-5 sm:px-0 md:mt-10 h-max">
                    <div className="mb-5">
                        <div className="text-4xl text-blue-600 text-center w-full dark:text-blue-300 font-semibold mb-3">PocketPal</div>
                        <div className="text-center w-full text-neutral-500 dark:text-white text-sm font-semibold">Welcome back! Let's review your expenses!</div>
                    </div>
                    {error ? <div className='text-blue-300 font-semibold mb-3 -mt-3'>{error}</div> : null}
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={loginSchema}
                        onSubmit={values => {
                            handleLogin(values);
                        }}
                    >
                        {({ values, errors, touched, handleChange }) => (
                            <Form className="w-full">
                                <input
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    type="email"
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    autoComplete="username"
                                    className="mb-4 shadow-lg p-3 rounded-lg dark:bg-inherit dark:border dark:text-white dark:outline-none"
                                />
                                {errors.email && touched.email ? <div className="text-blue-500 mb-3 -mt-3">{errors.email}</div> : null}
                                <input
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="mb-4 shadow-lg p-3 rounded-lg dark:bg-inherit dark:border dark:text-white dark:outline-none"
                                />
                                {errors.password && touched.password ? <div className="text-blue-500 mb-3 -mt-3">{errors.password}</div> : null}
                                <div className="flex justify-end items-center mb-5">
                                    <Link to="/" className="text-blue-600 dark:text-white font-semibold text-sm dark:hover:text-blue-300" onClick={(e) => e.stopPropagation()}>Forgot password?</Link >
                                </div>
                                <div>
                                    <m.button
                                        type="submit"
                                        className="default-btn w-full mb-3 font-semibold"
                                        aria-label="Submit Form"
                                        whileHover={{
                                            scale: 1.05
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            duration: 0.125,
                                            type: 'spring'
                                        }}
                                    >
                                        Sign in
                                    </m.button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-start items-center mt-5">
                        <span className='text-sm text-center w-full'>Don't have an account? <button onClick={() => navigate("/sign-up")} className="dark:hover:text-blue-300 text-blue-600 dark:text-white font-semibold">Create account</button></span>
                    </div>
                    {/* <div className="w-100 w-full text-center my-5">OR</div> */}
                </div>
            </div>
        </div>
    )
}

export default Login;