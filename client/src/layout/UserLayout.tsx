import { ReactNode } from "react";
import { m } from "framer-motion";
import { GiCalendar, GiNightSky, GiTakeMyMoney } from "react-icons/gi";
import { BiGrid, BiHome, BiUser } from "react-icons/bi";
import { useThemeContext } from "../hooks/useThemeContext";
import { MdWbSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UserLayout({ children }: { children: ReactNode }): JSX.Element {
    const { theme, toggleTheme } = useThemeContext();
    const navigate = useNavigate();

    function handleThemeToggle() {
        toggleTheme();
    }

    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <m.div
                className="absolute flex justify-between items-center mt-2 z-[999] py-2 w-full top-0 left-0"
            >
                <div className="flex justify-center items-center">
                    <m.button className="default-btn flex justify-center items-center"
                        aria-label="Expenses"
                        title="Expenses"
                        initial={{
                            transform: 'translateY(-1000px)',
                            rotate: '0deg'
                        }}
                        animate={{
                            transform: 'translateY(0px)',
                        }}
                        transition={{
                            duration: 1,
                            type: 'spring'
                        }}
                        onClick={() => navigate("/sign-in")}
                    >
                        <GiTakeMyMoney />
                        <span className="hidden sm:block ml-2">
                            Expenses
                        </span>
                    </m.button>
                    {/* <m.button className="default-btn flex justify-center items-center"
                        aria-label="Income"
                        title="Income"
                        initial={{
                            transform: 'translateY(-1000px)',
                            rotate: '0deg'
                        }}
                        animate={{
                            transform: 'translateY(0px)',
                        }}
                        transition={{
                            duration: 1.2,
                            type: 'spring'
                        }}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
                        onClick={() => navigate("/signs-in")}
                    >
                        <GiReceiveMoney />
                        <span className="hidden sm:block ml-2">
                            Income
                        </span>
                    </m.button> */}
                </div>
                <div className="flex justify-center items-center">
                    <m.button className="default-btn flex justify-center items-center"
                        aria-label="Month Selector"
                        title="Month Selector"
                        initial={{
                            transform: 'translateY(-1000px)',
                            rotate: '0deg'
                        }}
                        animate={{
                            transform: 'translateY(0px)',
                        }}
                        transition={{
                            duration: 1.4,
                            type: 'spring'
                        }}
                    >
                        <GiCalendar />
                        <span className="hidden sm:block ml-2">
                            Month
                        </span>
                    </m.button>
                    <m.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="default-btn flex justify-center items-center"
                        onClick={handleThemeToggle}
                        aria-label="Theme Toggler"
                        title="Theme Toggler"
                        initial={{
                            transform: 'translateY(-1000px)',
                            rotate: '0deg'
                        }}
                        animate={{
                            transform: 'translateY(0px)',
                        }}
                        transition={{
                            duration: 1.8,
                            type: 'spring'
                        }}
                    >
                        {
                            theme === 'light' ?
                                <GiNightSky size={20} />
                                : <MdWbSunny size={20} />
                        }
                    </m.button>
                </div>
            </m.div>
            <div className="overflow-auto  min-h-[100vh] h-[100vh] frame">
                {children}
            </div>
            <m.div
                className="p-3 sticky flex bottom-0 justify-center items-center w-full"
                initial={{
                    transform: 'translateY(1000px)',
                    rotate: '0deg'
                }}
                animate={{
                    transform: 'translateY(0px)',
                    // rotate: '-5deg'
                }}
                transition={{
                    duration: 1,
                    type: 'spring'
                }}
            >
                <m.button
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}
                    aria-label="Home"
                    title="Home"
                    className="default-btn flex justify-center items-center"
                    initial={{
                        transform: 'translateY(1000px)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px)',
                        // rotate: '-5deg'
                    }}
                    transition={{
                        duration: 1,
                        type: 'spring'
                    }}
                    onClick={() => navigate("/")}
                >
                    <BiHome />
                    <span className="hidden sm:block ml-2">
                        Home
                    </span>
                </m.button>
                <m.button
                    aria-label="Menu"
                    title="Menu"
                    className="default-btn flex justify-center items-center"
                    initial={{
                        transform: 'translateY(1000px)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px)',
                    }}
                    transition={{
                        duration: 1.2,
                        type: 'spring'
                    }}
                >
                    <BiGrid />
                    <span className="hidden sm:block ml-2">
                        Menu
                    </span>
                </m.button>
                <m.button
                    aria-label="Account"
                    title="Account"
                    className="default-btn flex justify-center items-center"
                    initial={{
                        transform: 'translateY(1000px)',
                        rotate: '0deg'
                    }}
                    animate={{
                        transform: 'translateY(0px)',
                    }}
                    transition={{
                        duration: 1.4,
                        type: 'spring'
                    }}
                >
                    <BiUser />
                    <span className="hidden sm:block ml-2">
                        Account
                    </span>
                </m.button>
            </m.div>
        </div>
    )
}

export default UserLayout