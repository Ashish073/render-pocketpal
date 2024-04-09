import { lazy } from 'react';

import { rootConfig, loggedInConfig } from './routeConfig.ts';

const Signup = lazy(() => import('../pages/signup'));
const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Landing = lazy(() => import('../pages/landing'));
const NotFound = lazy(() => import('../pages/NotFound'));


export const routes = [
    {
        path: rootConfig.home.path,
        element: Landing,
        title: rootConfig.home.title,
        navbarVisibility: false,
        slug: rootConfig.home.slug
    },
    {
        path: rootConfig.login.path,
        element: Login,
        title: rootConfig.login.title,
        navbarVisibility: false,
        slug: rootConfig.login.slug
    },
    {
        path: rootConfig.signup.path,
        element: Signup,
        title: rootConfig.signup.title,
        navbarVisibility: false,
        slug: rootConfig.signup.slug
    },
    {
        path: rootConfig.notFound.path,
        element: NotFound,
        title: rootConfig.notFound.title
    },
];

export const loggedInRoutes = [
    {
        path: loggedInConfig.dashboard.path,
        element: Dashboard,
        slug: loggedInConfig.dashboard.slug,
    },
    {
        path: loggedInConfig.notFound.path,
        element: NotFound,
        title: loggedInConfig.notFound.title
    },
];