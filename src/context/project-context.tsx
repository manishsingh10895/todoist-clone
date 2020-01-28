import React, { useContext } from 'react';
import { useProjects } from '../hooks';
import { Project } from '../models/project.model';
export const ProjectContext = React.createContext<{ projects: Project[], setProjects: Function }>({ projects: [], setProjects: () => { } });

export const ProjectsProvider = ({ children }) => {
    const { projects, setProjects } = useProjects()

    return <ProjectContext.Provider value={{ projects, setProjects }}>
        {children}
    </ProjectContext.Provider>
}


export const useProjectsValue = () => useContext(ProjectContext);