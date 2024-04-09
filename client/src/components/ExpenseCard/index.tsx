import { useState } from "react";
import { motion, m, DragControls } from "framer-motion"
import { categoryIcons } from "../../constants/icons";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { convertDateTime } from "../../constants/helpers";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Expense, ModalData } from "../../pages/dashboard/Dashboard";
import { AxiosResponse } from "axios";
import { deleteService } from "../../services/apiServices";
import { TARGET_EXPENSE } from "../../constants/apiEndPoints";
import { setExpenses } from "../../redux/slices/expenseSlice";
import { useDispatch } from "react-redux";
import Loader from "../Loader";

function ExpenseCard({ expense, index, handleEditModal, dragControls }: { expense: Expense, index: number, handleEditModal: (data: ModalData) => void, dragControls: DragControls }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const handleDelete = async (id: string): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await deleteService(TARGET_EXPENSE.replace(':id', id), {}) as AxiosResponse<{ expenses: Expense[] }>;
            dispatch(setExpenses(response?.data?.expenses));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <motion.div
            layout
            title="Drag to perform operations"
            initial={{ opacity: 0, y: -120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
                scale: 0,
                transition: {
                    type: "just"
                }
            }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="relative z-0">
            <motion.div
                layout
                transition={{ delay: 0.1, type: 'spring', velocity: 1000 }}
                className="my-1 p-3 py-2 shadow-lg rounded-xl z-[2] cursor-grab overflow-hidden flex justify-between items-center bg-white w-full  dark:bg-[#28314A] relative"
                drag="x"
                whileTap={{ cursor: 'grabbing' }}
                dragControls={dragControls}
                dragConstraints={{ left: -100, right: 0 }}
                dragElastic={0.1}
            >
                <div className="flex justify-start items-start sm:items-center w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center p-2 mt-1 sm:mt-0 items-center bg-blue-600 dark:bg-[#FFFFFF20] rounded-xl">
                        <span className="text-white text-[25px]">
                            {categoryIcons[expense.category]}
                        </span>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <span className="ml-3 font-semibold text-lg text-blue-600 dark:text-blue-300 flex flex-wrap justify-start sm:justify-start items-center w-full">
                            <div className="mr-1">{expense.category}</div><div className="text-sm mt-[-4px] sm:mt-0 mr-3 ms:mr-0 text-neutral-400">● {convertDateTime(expense.createdAt)}</div>
                        </span>
                        <span className="ml-3 sm:block text-sm text-neutral-500 mt-1 dark:text-white font-semibold truncate w-max max-w-[118px] md:max-w-[225px] lg:max-w-[170px] xl:max-w-[245px]">
                            {expense.description}
                        </span>
                        <span className="ml-3 flex sm:hidden justify-start items-center mt-1">
                            <FaIndianRupeeSign size={12} /> <div className="font-semibold text-[18px] break-words text-wrap flex flex-wrap">{expense.amount}</div>
                        </span>
                    </div>
                </div>
                <div className="justify-start items-start hidden sm:flex">
                    <FaIndianRupeeSign size={12} className="mt-2" /> <p className="font-semibold text-[18px] text-wrap  md:max-w-[40px] lg:max-w-[60px] break-words">{expense.amount}</p>
                </div>
            </motion.div>
            <div
                className="buttons absolute top-[50%] right-1 translate-y-[-50%] flex justify-center items-center ml-2">
                <m.button aria-label="Edit button" title="Edit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="rounded-md p-3 bg-blue-400 mr-1 text-white" onClick={() => handleEditModal(expense)}><CiEdit size={20} /></m.button>
                <m.button aria-label="Delete button" title="Delete" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="rounded-md p-3 bg-red-400 text-white" onClick={() => handleDelete(expense._id)}>
                    {
                        isLoading ?
                            <Loader color="#FFF" height="20" width="20" /> :
                            <MdOutlineDelete size={20} />
                    }
                </m.button>
            </div>
        </motion.div>
    )
}

export default ExpenseCard