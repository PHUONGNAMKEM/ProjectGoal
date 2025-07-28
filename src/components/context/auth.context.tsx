import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType } from '../../types/AuthContextType';
import { Rank, Role, User } from '../../types/UserType';


export const AuthContext = createContext<AuthContextType>({
    // user: {
    //     email: "",
    //     username: "",
    //     role: Role.USER,
    //     idUser: -1,
    //     point: 0,
    //     rank: Rank.BRONZE
    // },
    user: null,
    setUser: () => { },
    isAppLoading: false,
    setIsAppLoading: () => { }
});



export const AuthWrapper = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        // {
        //     email: "",
        //     username: "",
        //     role: Role.USER,
        //     idUser: 1,
        //     point: 0,
        //     rank: Rank.BRONZE
        // }
        null
    );

    const [isAppLoading, setIsAppLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
}