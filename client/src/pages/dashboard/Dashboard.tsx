import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"
import { getService, postService, putService } from "../../services/apiServices";
import { ADD_EXPENSE, GET_CATEGORIES, GET_EXPENSES, GET_EXPENSE_DATE, TARGET_EXPENSE } from "../../constants/apiEndPoints";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";
import { setExpenseDates, setExpenses } from "../../redux/slices/expenseSlice";
import { AnimatePresence, m, useDragControls } from "framer-motion";
import { setCategories, setCategoriesOptions } from "../../redux/slices/categoriesSlice";
import { IoMdAdd } from "react-icons/io";
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import Modal from "../../components/Modal";
import DraggableCard from "../../components/ExpenseCard";
import Loader from "../../components/Loader";
import Select from 'react-select';
import Carousel from "../../components/Carousel";

export interface Expense {
    _id: string,
    userId: string;
    category: string;
    amount: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
}

export interface ModalData {
    _id: string,
    category: string;
    amount: string;
    description?: string;
}

interface Category {
    id: string;
    name: string;
}

interface ExpenseCategoriesResponse {
    expenses: Expense[];
    categories: Category[];
    dates: Date[];
}

interface Option {
    label: string
    value: string
}

interface FormValues { category: string; amount: string; description: string; }

const initialModalData = {
    _id: '',
    category: '',
    amount: '',
    description: '',
};

function Dashboard() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalData>(initialModalData);
    const dispatch = useDispatch();
    const expenses = useSelector((state: RootState) => state.expenseSlice.expenses);
    // const categories = useSelector((state: RootState) => state.categoriesSlice.categories);
    const categoriesOptions: Option[] = useSelector((state: RootState) => state.categoriesSlice.categoriesOptions);
    const dragControls = useDragControls();

    const addExpenseSchema = Yup.object().shape({
        category: Yup.string().required("Category is required!"),
        amount: Yup.string().required("Amount is required!"),
        description: Yup.string().optional(),
    });

    const fetchExpensesAndCategories = async (): Promise<void> => {
        const categoryOptionArray: Option[] = [];
        try {
            setIsLoading(true);
            const response = await Promise.all([getService(GET_EXPENSES), getService(GET_CATEGORIES), getService(GET_EXPENSE_DATE)]) as AxiosResponse<ExpenseCategoriesResponse>[];
            response[1].data?.categories.forEach(category => categoryOptionArray.push({ label: category.name, value: category.name }))

            dispatch(setExpenses(response[0].data?.expenses));
            dispatch(setCategories(response[1].data?.categories));
            dispatch(setExpenseDates(response[2].data?.dates));
            dispatch(setCategoriesOptions(categoryOptionArray));

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchExpensesByDate = async ({ date }: { date: Date | null }): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await getService(GET_EXPENSES) as AxiosResponse<{ expenses: Expense[] }>;
            dispatch(setExpenses(response?.data?.expenses));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExpensesAndCategories();
    }, []);

    function handleCloseModal() {
        setOpenModal(false);
        setModalData(initialModalData);
    }

    function handleEditModal(data: ModalData) {
        setOpenModal(true);
        setModalData(data);
    }

    const handleSubmit = async (values: FormValues): Promise<void> => {
        try {
            setIsLoading(true);
            let response;
            if (modalData._id) {
                response = await putService(TARGET_EXPENSE.replace(':id', modalData._id), {
                    ...values
                }) as AxiosResponse<{ expenses: Expense[] }>;
            } else {
                response = await postService(ADD_EXPENSE, {
                    ...values
                }) as AxiosResponse<{ expenses: Expense[] }>;
            }
            dispatch(setExpenses(response?.data?.expenses));
            handleCloseModal()
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function openModalFunc() {
        return (
            <Modal title={modalData?.category ? 'Edit Expense' : 'Add Expense'} handleClose={handleCloseModal}>
                <Formik
                    initialValues={{
                        category: modalData?.category || '',
                        amount: modalData?.amount || '',
                        description: modalData?.description || '',
                    }}
                    validationSchema={addExpenseSchema}
                    onSubmit={(values: FormValues) => {
                        console.log(values);
                        handleSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <div className="p-2">
                                <div className="w-full">
                                    <Field name="category">
                                        {
                                            ({ field }: FieldProps) => (
                                                <Select
                                                    {...field}
                                                    options={categoriesOptions}
                                                    onChange={(option) => handleChange('category')(option?.value || '')}
                                                    value={categoriesOptions.find((option) => option.value === values.category)}
                                                    isClearable
                                                    isSearchable
                                                    placeholder="Select expense type"
                                                    classNamePrefix="pp"
                                                />
                                            )
                                        }
                                    </Field>
                                    {errors.category && touched.category ? (
                                        <div className="text-blue-500">{errors.category}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <div className="pt-3 relative group/input">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            id="amount"
                                            name="amount"
                                            value={values.amount}
                                            type="number"
                                            onChange={(e) => { e.stopPropagation(); handleChange(e) }}
                                            inputMode="numeric"
                                            placeholder="eg:1000"
                                            pattern="[0-9]*"
                                            className="mb-3 py-2  outline-none border-b bg-inherit focus:ring-blue-500 focus:border-blue-500 focus"
                                        />
                                        {errors.amount && touched.amount ? (
                                            <div className="text-blue-500 mb-3 -mt-3">{errors.amount}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            name="description"
                                            placeholder="Please provide a short description"
                                            className="resize-none  py-2 h-full w-full border-b bg-inherit outline-none focus:ring-blue-500 focus:border-blue-500 focus"
                                            rows={5}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 py-2 border-t-1 border-blue-300 w-full min-h-max text-end bg-blue-50 dark:dark:bg-[#2f3853] rounded-b-md">
                                <button type="submit" className="bottom-0 right-0 normal-btn p-2 px-3">
                                    {
                                        isLoading ?
                                            <Loader color="#FFF" height="20" width="20" /> :
                                            'Submit'
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="bottom-0 right-0 ml-3"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        );
    }


    if (expenses.length === 0 && isLoading) {
        return <Loader color="" width="50" height="50" />
    }



    return (
        <div className="page py-[70px] overflow-x-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard - PocketPal</title>
                <meta name="description" content="PocketPal dashboard provides a GUI that helps you visualize your expenses" />
            </Helmet>
            <section className="mx-3 md:mx-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
                <div>
                </div>
                <m.div
                    className="flex flex-col col-span-1 md:col-span-2 lg:col-span-1"
                    initial={{ opacity: 0, y: -120 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.09, type: 'spring' }}
                >
                    <Carousel fetchExpensesByDate={fetchExpensesByDate} />

                    <div className="flex justify-between items-center mt-2 mb-3">
                        <h1 className="text-xl text-blue-600 dark:text-blue-300 font-semibold">Expense history</h1>
                        <m.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} aria-label="Add expense button" title="Add Expense" className="bg-blue-100 hover:bg-gradient-to-r dark:text-white text-indigo-600 hover:from-blue-500 hover:to-violet-500 hover:text-white flex justify-center rounded-md dark:bg-[#ffffff20]  items-center p-3" onClick={() => { setModalData(initialModalData); setOpenModal(true) }}>
                            <IoMdAdd />
                        </m.button>
                    </div>
                    <AnimatePresence>
                        {
                            expenses.length ?
                                expenses?.map((expense: Expense, index) =>
                                    <DraggableCard key={expense._id} expense={expense} index={index} handleEditModal={handleEditModal} dragControls={dragControls} />
                                ) :
                                <div className="flex justify-center items-center size-full"
                                >
                                    You have not registered any expenses for today
                                </div>
                        }
                    </AnimatePresence>
                </m.div>
                <div></div>
            </section >
            <AnimatePresence>
                {openModal && openModalFunc()}
            </AnimatePresence>
        </div >
    )
}

export default Dashboard