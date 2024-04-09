import { Helmet } from "react-helmet-async";
import SignUpImg from '../../assets/sign-up.png';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GiNightSky } from "react-icons/gi";
import { MdWbSunny } from "react-icons/md";
import { useThemeContext } from "../../hooks/useThemeContext";
import { m } from "framer-motion";
import { postService } from "../../services/apiServices";
import { SIGN_UP_API } from "../../constants/apiEndPoints";

export interface SignupValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

function Signup() {
    const { theme, toggleTheme } = useThemeContext();
    const navigate = useNavigate();

    function handleThemeToggle() {
        toggleTheme();
    }

    const signupSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required!').matches(/^[a-zA-Z]+$/, "Must Only Contain Alphabets"),
        lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required!'),
        email: Yup.string().email('Invalid email').required("Email Address is required!"),
        password: Yup.string().required("Password is required!").matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
    });

    async function handleSignup(values: SignupValues) {
        const { firstName, lastName, email, password } = values;
        try {
            await postService(SIGN_UP_API, {
                firstName,
                lastName,
                email,
                password
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-[100vh]">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign up - PocketPal</title>
                <meta name="description" content="Signup with PocketPal and track your expenses" />
            </Helmet>
            <section className="h-[100vh] grid grid-cols-1 xl:grid-cols-2">
                <div className="h-full bg-blue-600 dark:bg-[#28314A] hidden xl:block">
                    <img src={SignUpImg} alt="Sign up showcase" />
                </div>
                <div className="p-5 flex justify-center items-center relative">
                    <m.button
                        onClick={() => navigate("/")}
                        aria-label="Go home"
                        className="default-btn absolute top-3 left-3 w-max rounded-full text-lg p-3 px-5 dark:text-white dark:bg-[#ffffff20] bg-blue-100 text-indigo-600 hover:bg-blue-600 hover:text-white mx-1 flex justify-center items-center"
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
                    <button aria-label="theme toggle" title="Theme Toggler" className={`absolute right-3 top-3 p-3 mr-[-5px] rounded border-none bg-transparent dark:bg-transparent ${theme === 'light' ? 'hover:text-[#415086]' : 'hover:text-[#EBDCCD]'}`} onClick={handleThemeToggle}>
                        {
                            theme === 'light' ?
                                <GiNightSky size={30} className="text-indigo-900" />
                                : <MdWbSunny size={30} />
                        }
                    </button>
                    <div className='flex h-full justify-center items-center w-full mt-10'>
                        <div className="w-auto mx-5 xs:mx-0 xs:w-3/4 sm:w-2/5 md:w-3/6 lg:w-2/6 xl:w-3/6 h-max">
                            <div className="mb-7">
                                <div className="font-semibold text-neutral-500 dark:text-white text-2xl text-center w-full">Welcome to <span className="text-4xl text-blue-700 dark:text-blue-300">PocketPal</span></div>
                                <div className="text-center w-full font-semibold text-neutral-500 dark:text-white text-sm">Register with us to keep track of your expenses</div>
                            </div>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={signupSchema}
                                onSubmit={values => {
                                    handleSignup(values);
                                }}
                            >
                                {({ values, errors, touched, handleChange }) => (
                                    <Form className="flex flex-col w-full">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            value={values.firstName}
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="First name"
                                            autoComplete="firstname"
                                            className="mb-4 shadow-lg p-3 rounded-lg"
                                        />
                                        {errors.firstName && touched.firstName ? <div className="text-blue-500 mb-3 -mt-3">{errors.firstName}</div> : null}
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            value={values.lastName}
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            autoComplete="lastname"
                                            className="mb-4 shadow-lg p-3 rounded-lg"
                                        />
                                        {errors.lastName && touched.lastName ? <div className="text-blue-500 mb-3 -mt-3">{errors.lastName}</div> : null}
                                        <input
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            type="email"
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            autoComplete="username"
                                            className="mb-4 shadow-lg p-3 rounded-lg"
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
                                            className="mb-4 shadow-lg p-3 rounded-lg"
                                        />
                                        {errors.password && touched.password ? <div className="text-blue-500 mb-3 -mt-3">{errors.password}</div> : null}
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm Password"
                                            type="password"
                                            autoComplete="confirm-password"
                                            className="mb-4 shadow-lg p-3 rounded-lg"
                                        />
                                        {errors.confirmPassword && touched.confirmPassword ? <div className="text-blue-500 mb-3 -mt-3">{errors.confirmPassword}</div> : null}
                                        <m.button
                                            type="submit"
                                            className="default-btn my-3 font-semibold"
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
                                            Create account
                                        </m.button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="flex justify-start items-center mt-2">
                                <span className='text-sm text-center w-full'>Already have an account? <button onClick={() => navigate("/sign-in")} className="dark:hover:text-blue-300 capitalize text-blue-600 dark:text-white font-semibold">Sign in</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup