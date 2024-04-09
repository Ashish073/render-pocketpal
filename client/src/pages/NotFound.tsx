import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { m } from "framer-motion"

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="z-[99999] mt-[-60px] flex flex-col justify-center items-center h-screen w-screen px-10 overflow-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>404 Not Found - PocketPal</title>
                <meta name="description" content="PocketPal your one web location to track all your monthly expenses" />
            </Helmet>
            <div className="text-[80px] flex justify-center items-center font-bold text-blue-600 dark:text-blue-300 z-[999]">
                <m.div
                    initial={{
                        transform: 'translateY(-1000px) rotate(0deg)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px) rotate(-5deg)',
                        // rotate: '-5deg'
                    }}
                    transition={{
                        duration: 1,
                        type: 'spring'
                    }}
                >
                    4
                </m.div>
                <m.div
                    className="text-violet-600 dark:text-white"
                    initial={{
                        transform: 'translateY(-1000px) rotate(0deg)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px) rotate(360deg)',
                        // rotate: '-5deg'
                    }}
                    transition={{
                        duration: 1.2,
                        type: 'spring'
                    }}
                >
                    0
                </m.div>
                <m.div
                    initial={{
                        transform: 'translateY(-1000px) rotate(0deg)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px) rotate(5deg)',
                        // rotate: '-5deg'
                    }}
                    transition={{
                        duration: 1.4,
                        type: 'spring'
                    }}
                >
                    4
                </m.div>
            </div>
            <m.p
                className="mt-[-25px] text-[30px] font-semibold text-center"
                initial={{
                    transform: 'translateY(1000px)',
                    rotate: '0deg'
                }}
                animate={{
                    transform: 'translateY(0px)',
                    // rotate: '-5deg'
                }}
                transition={{
                    duration: 1.6,
                    type: 'spring'
                }}
            >
                Oops! The page you are looking for does not exist.
            </m.p>
            <m.div className="mt-5"
                initial={{
                    transform: 'translateY(1000px)',
                    rotate: '0deg'
                }}
                animate={{
                    transform: 'translateY(0px)',
                    // rotate: '-5deg'
                }}
                transition={{
                    duration: 1.8,
                    type: 'spring'
                }}
            >
                <m.button
                    onClick={() => navigate("/")}
                    className="default-btn my-3"
                    whileHover={{
                        scale: 1.15
                    }}
                    whileTap={{
                        scale: 0.85,
                        rotate: "2.5deg"
                    }}
                    transition={{
                        duration: 0.125,
                        type: 'spring'
                    }}
                >
                    Go home
                </m.button>
            </m.div>
        </div>
    )
}

export default NotFound