import { ReactNode } from 'react'
import Navbar from '../components/Navbar/Navbar';
import UserLayout from './UserLayout';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);

    const { pathname } = useLocation();

    if (isLoggedIn) {
        return (<main>
            <UserLayout>
                {children}
            </UserLayout>
        </main>)

    }

    return (
        <main className='h-full'>
            <Navbar path={pathname} />
            {children}
        </main>
    )
}

export default RootLayout