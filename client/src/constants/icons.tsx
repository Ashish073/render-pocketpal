import { FaShoppingCart, FaCar, FaUtensils, FaPlane } from 'react-icons/fa';
import { GiHealthNormal, GiFamilyHouse, GiFireplace, GiKitchenScale, GiElectric } from 'react-icons/gi';
import { BsFilm, BsBagFill, BsHeartFill, BsBook, BsDiamond, BsArchiveFill } from 'react-icons/bs';

interface CategoryIcons {
    [key: string]: JSX.Element;
}

export const categoryIcons: CategoryIcons = {
    "Groceries": <FaShoppingCart />,
    "Utilities": <GiElectric />,
    "Rent/Mortgage": <GiFamilyHouse />,
    "Rent": <GiFamilyHouse />,
    "Mortgage": <GiFamilyHouse />,
    "Transportation": <FaCar />,
    "Dining Out": <FaUtensils />,
    "Entertainment": <BsFilm />,
    "Health & Fitness": <GiHealthNormal />,
    "Shopping": <BsBagFill />,
    "Travel": <FaPlane />,
    "Education": <BsBook />,
    "Insurance": <BsDiamond />,
    "Personal Care": <GiKitchenScale />,
    "Gifts & Donations": <BsHeartFill />,
    "Home Maintenance": <GiFireplace />,
    "Subscriptions & Memberships": <BsArchiveFill />,
};

