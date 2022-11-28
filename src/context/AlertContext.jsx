import { createContext, useState } from "react";

export const AlertContext = createContext()

export function AlertContextProvider({ children }) {
    const [alert, setAlert] = useState(false)
    const [values, setValues] = useState({})

    return (
        <AlertContext.Provider value={{ alert, setAlert, values, setValues }}>
            {children}
        </AlertContext.Provider>
    )
}