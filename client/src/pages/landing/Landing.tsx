import { Helmet } from "react-helmet-async"
import LandingImg from '../../assets/landing.png'
import { useNavigate } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6"
import { m } from "framer-motion"

function Landing() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <Helmet>
                <meta charSet="utf-8" />
                <title>PocketPal</title>
                <meta name="description" content="PocketPal your one web location to track all your monthly expenses" />
            </Helmet>
            <section className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 mx-3 md:mx-10">
                <div className="flex justify-center items-start flex-col mx-3 mb-4  md:mb-0">
                    <h1 className="text-[40px] lg:text-[60px] leading-[40px] lg:leading-[60px] text-blue-700 dark:text-white font-semibold mb-4">
                        <span className="dark:text-blue-500 text-violet-600">Take Control</span> of Your
                        Finances with <span className="dark:text-violet-500 text-violet-600">PocketPal</span>
                    </h1>
                    <p className="">PocketPal is your all-in-one solution for effortless expense tracking. Say goodbye to financial stress and hello to financial freedom. Track your expenses, set budgets, and achieve your financial goals with ease. Join thousands of satisfied users and start managing your money like a pro today!</p>
                    <m.button
                        onClick={() => navigate('/sign-up')}
                        className="mt-4 default-btn -ml-5 flex justify-center items-center w-max"
                        whileHover={{
                            scale: 1.15
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.125,
                            type: 'spring'
                        }}
                    >
                        Where can I sign up? <FaArrowRightLong size={20} className="ml-3" />
                    </m.button>
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <img src={LandingImg} alt="Save money" className="h-auto md:h-[250px] lg:h-[400px]" />
                </div>
            </section>
        </div>
    )
}

export default Landing