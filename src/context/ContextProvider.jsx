import { createContext, useState } from 'react';
import Session from '../utils/session';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {
    var auth = Session.getSession('auth')

    const [ account, setAccount ] = useState(auth?.name);
    
    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;