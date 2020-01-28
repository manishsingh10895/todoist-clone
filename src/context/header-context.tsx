import React, { useState, useContext } from 'react';

export const HeaderContext = React.createContext<{ showHeader: boolean, setShowHeader: Function }>({ showHeader: true, setShowHeader: () => { } })

export const HeaderProvider = ({ children }) => {
    const [showHeader, setShowHeader] = useState(true);

    return <HeaderContext.Provider value={{ showHeader: showHeader, setShowHeader: setShowHeader }}>
        {children}
    </HeaderContext.Provider>
}

export const useHeaderValue = () => useContext(HeaderContext);