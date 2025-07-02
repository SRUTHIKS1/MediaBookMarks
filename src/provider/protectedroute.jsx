import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.media.isLoggedIn);
    const [isAllowed, setIsAllowed] = useState(!!localStorage.getItem('userCredential'));

    useEffect(() => {
        const checkAuthStatus = () => {
            const isAuthenticated = !!localStorage.getItem('userCredential');
            if (isAuthenticated) {
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
                navigate("/login");
            }
        };

        checkAuthStatus();

        const handleStorageChange = (event) => {
            console.log(event)
            if (event.storageArea === localStorage) {
                checkAuthStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [isLoggedIn]);

    return isAllowed &&
        <>
            {children}
        </>;
}

export default ProtectedRoute;