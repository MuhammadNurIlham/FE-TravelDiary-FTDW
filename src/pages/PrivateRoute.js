import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';


const PrivateRoute = () => {

    const [state, dispatch] = useContext(UserContext);

    console.log(state)

    return state.isLogin ? <Outlet /> : <Navigate to='/' />
};

export default PrivateRoute;