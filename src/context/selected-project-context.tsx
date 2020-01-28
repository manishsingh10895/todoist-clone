import React, { useState, useContext } from 'react';
import { useProjects } from '../hooks';

export const SelectedProjectContext = React.createContext<{ selectedProject: string, setSelectedProject: Function }>({ selectedProject: 'INBOX', setSelectedProject: () => { } });

export const SelectedProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState('INBOX');

    return (
        <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </SelectedProjectContext.Provider>
    )
}

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);