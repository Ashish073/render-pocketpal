import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface ToastContextType {
    message: string;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: ToastContextType = {
    message: "",
    setToastMessage: () => { }
};

export const ToastContext = createContext<ToastContextType | undefined>(initialState);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>("");

    const setToastMessage: React.Dispatch<React.SetStateAction<string>> = (msg) => {
        setMessage(msg);
    };

    return (
        <ToastContext.Provider value={{ message, setToastMessage }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};

export default ToastProvider;
