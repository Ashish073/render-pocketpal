import { m } from "framer-motion"
import { ReactNode } from "react"
import { IoMdClose } from "react-icons/io"


function Modal({ children, title, handleClose }: { children: ReactNode, title: string, handleClose: () => void }) {
    return (
        <>
            <div
                className="fixed h-screen w-screen z-[999999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#00000050] flex justify-center items-center dark:text-white">
                <m.div
                    initial={{
                        scale: 0
                    }}
                    animate={{
                        scale: 1
                    }}
                    transition={{
                        duration: 0.5,
                        type: 'spring'
                    }}
                    exit={{
                        scale: 0,
                        transition: {
                            type: 'just'
                        }
                    }}
                    className="bg-white dark:bg-[#343e5a] flex flex-col justify-start items-center text-black rounded-md dark:text-white">
                    <div className="w-full text-center relative dark:bg-blue-700 bg-blue-500 rounded-t-md">
                        <h1 className="text-xl p-3 text-white">{title}</h1>
                        <button className="absolute right-3 top-3 text-white" onClick={handleClose}><IoMdClose size={20} /></button>
                    </div>
                    <div>
                        {
                            children
                        }
                    </div>
                </m.div>
            </div >
        </>
    )
}

export default Modal