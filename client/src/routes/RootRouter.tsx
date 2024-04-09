import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loggedInRoutes, routes } from './routes';
import Loader from '../assets/loader.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


function RootRouter() {
    const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);

    return (
        <Suspense fallback={<div className='fixed z-[99999] top-0 left-0 h-screen w-screen flex justify-center items-center'><span><img alt="Loading..." width="100px" height="100px" src={Loader} /></span></div>}>
            <Routes>
                {isLoggedIn ?
                    <>
                        {

                            loggedInRoutes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.element />}
                                />
                            ))
                        }
                    </>
                    :
                    <>
                        {

                            routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.element />}
                                />
                            ))
                        }
                    </>
                }
            </Routes>
        </Suspense>
    );
}

export default RootRouter;
