"use client"

import React, { createContext, useContext, ReactNode } from 'react'

type AuthContext = {
    login: (token: string) => void;
    logout: () => void
}

const AuthContext = createContext<AuthContext>({
    login: () => {},
    logout: () => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const login = async (token: string) => {
        localStorage.setItem('auth_token', token)
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
    }

    const value = {
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
