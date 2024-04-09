import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/toastSlice';
import { useThemeContext } from '../../hooks/useThemeContext';
import { RootState } from '../../redux/store';

function Snackbar() {
    const message = useSelector((state: RootState) => state.toastSlice.message);
    const { theme } = useThemeContext();
    const dispatch = useDispatch();

    useEffect(() => {
        if (message) {
            toast(message, { autoClose: 4000, theme: theme === 'light' ? 'dark' : 'light' });
            const timeoutId = setTimeout(() => {
                dispatch(setMessage(""));
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [message, dispatch]);

    return (
        <div className='z-[99999999999]'>
            <ToastContainer />
        </div>
    );
}

export default Snackbar;
