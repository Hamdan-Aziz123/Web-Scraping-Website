import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const authContext = createContext({
    user: null,
    setUser: (user) => {},
    login: (user) => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const cookieUser = Cookies.get('user');
        // Parse only if the cookie exists and is not undefined
        return cookieUser ? JSON.parse(cookieUser) : null;
    });

    const login = (user) => {
        if (!user) return;

        console.log('user', user);

        setUser(user);
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
    };


    const value = {
        user,
        setUser,
        login,
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
};

export { authContext };
