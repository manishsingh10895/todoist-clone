import React, { useState, useContext } from 'react';
import { useHeaderValue } from './header-context';

export const LayoutContext = React.createContext<{ isMobile: boolean }>({ isMobile: false })

const MOBILE_WIDTH = 768;

/**
  * Check if the device is mobile or desktop
  */
function checkIfMobile(width?) {
    if (width <= MOBILE_WIDTH) {
        return true;
    }

    return window.innerWidth <= MOBILE_WIDTH;
}

function debounce(func: Function, wait, immediate?) {
    var timeout;

    return function () {
        //@ts-ignore
        var context: any = this, args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait)

        if (callNow) func.apply(context, args);
    }
}

export const LayoutProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(checkIfMobile());

    const { showHeader, setShowHeader } = useHeaderValue();

    window.addEventListener('resize', debounce(function () {
        console.log(isMobile);
        if (checkIfMobile()) {
            setShowHeader(false);
            setIsMobile(true);
        } else {
            setShowHeader(true);
            setIsMobile(false);
        }
    }, 250))

    return <LayoutContext.Provider value={{ isMobile: isMobile }}>
        {children}
    </LayoutContext.Provider>
}

export const useLayoutValue = () => useContext(LayoutContext);