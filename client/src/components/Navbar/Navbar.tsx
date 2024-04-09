import { useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { CgMenuRightAlt } from "react-icons/cg";
import { GiNightSky } from "react-icons/gi";
import { MdWbSunny, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { SiPocketcasts } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { m } from "framer-motion";

function Navbar({ path }: { path: string }): JSX.Element {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleThemeToggle() {
        toggleTheme();
    }

    function handleMenu() {
        setIsOpen(prev => !prev);
    }


    return (
        <header className="sticky top-0 shadow-lg bg-white dark:bg-[#20263b]">
            <nav className={`items-center justify-between flex-wrap py-2 w-full px-3 top-0 ${path === '/sign-up' || path === '/sign-in' ? 'hidden' : 'flex'}`}>
                <Link to="/">
                    <span className="font-semibold text-4xl tracking-tight flex items-center justify-center dark:text-inherit text-blue-700 px-3"><SiPocketcasts size={40} className="mr-3 " /> <span className="hidden md:block">PocketPal</span></span>
                </Link>
                <div className="flex items-center">
                    <div className="hidden md:flex">
                        {/* <Link to="/login" className="rounded-full p-3 px-5 mx-1 hover:text-blue-600 dark:hover:bg-[#ffffff20] dark:hover:text-white">
                            Sign in
                        </Link> */}
                        <m.button onClick={() => navigate("/sign-in")} className="default-btn flex justify-center items-center"
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.85,
                            }}
                            transition={{
                                duration: 0.125,
                                type: 'spring'
                            }}
                        >
                            Sign in <FaArrowRightLong size={20} className="ml-3" />
                        </m.button>
                    </div>
                    <aside className={`absolute sm:absolute md:absolute z-[99999999] overflow-hidden transition-all ${isOpen ? 'max-w-96 w-full' : 'max-w-0 w-0 p-0'} h-screen right-[-20px] md:right-[-40px] top-0 sm:static sm:block md:flex md:justify-start md:items-start bg-white text-white dark:bg-[#121622] shadow-lg`}>
                        <div className="text-sm p-3 pr-6 w-full">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl tracking-tight flex justify-start items-center dark:text-inherit text-blue-700">Menu</span>
                                <button aria-label="Close menu" title="Close menu" className={`border-none text-blue-700 dark:text-white`} onClick={handleMenu}>
                                    <MdKeyboardDoubleArrowRight size={30} />
                                </button>
                            </div>
                            {/* <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-center text-blue-700 dark:text-white">
                                Sign in
                            </Link> */}
                            <Link to="/sign-up" className="mt-4 lg:inline-block lg:mt-0 mr-4 flex justify-center items-center text-blue-700 dark:text-white">
                                Sign up <FaArrowRightLong size={20} className="ml-3" />
                            </Link>
                        </div>
                    </aside>
                    <button aria-label="theme toggle" title="Theme Toggler" className={`p-3 mr-[-5px] rounded border-none bg-transparent dark:bg-transparent ${theme === 'light' ? 'hover:text-[#415086]' : 'hover:text-[#EBDCCD]'}`} onClick={handleThemeToggle}>
                        {
                            theme === 'light' ?
                                <GiNightSky size={30} className="text-indigo-900" />
                                : <MdWbSunny size={30} />
                        }
                    </button>
                    <div className="block md:hidden">
                        <button aria-label="menu" title="Menu" className="flex items-center py-2 border rounded text-inherit border-none hover:text-inherit hover:border-white" onClick={handleMenu}>
                            <CgMenuRightAlt size={30} title="menu" />
                        </button>
                    </div>
                </div >
            </nav >
        </header >
    );
}

export default Navbar;
