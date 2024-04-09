import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../constants/helpers';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';


function Carousel({ fetchExpensesByDate }: { fetchExpensesByDate: (date: Date | null) => void }) {
    const [width, setWidth] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    const carouselRef = useRef<HTMLDivElement>(null);
    const dates = useSelector((state: RootState) => state.expenseSlice.dates);

    useEffect(() => {
        if (carouselRef.current) {
            console.log()
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    const handleOptionClick = (option: Date | null, index: number) => {
        setSelectedOption(index);
        if (!option) {
            fetchExpensesByDate(null);
            return;
        }
        fetchExpensesByDate(option);
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                    scale: 0,
                    transition: {
                        type: "just"
                    }
                }}
                transition={{ delay: 0, duration: 0.5, type: 'spring' }}
                ref={carouselRef}
                className="carousel w-full overflow-hidden h-full"
                whileTap={{ cursor: 'grabbing' }}
            >
                <motion.div className="inner-carousel w-full" drag="x" dragConstraints={{ left: -width, right: 0 }}>
                    <div className={`item ${selectedOption === -1 && 'selected'} h-full `} aria-label="Expense date" role="button" onClick={() => handleOptionClick(null, -1)}>
                        All
                    </div>
                    {dates.map((date: Date, index) => (
                        <div key={`${date}_${index}`} className={`item ${index === 0 && 'selected'}`} aria-label="Expense date" role="button" onClick={() => handleOptionClick(date, index)}>
                            <div className="text-3xl">{formatDate(date).date}</div>
                            <div className="text-lg">{formatDate(date).month}</div>
                            <div className="text-sm">{formatDate(date).year}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Carousel;

