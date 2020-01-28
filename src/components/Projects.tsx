import React, { useState } from 'react';
import { useSelectedProjectValue } from '../context/selected-project-context';
import { useProjectsValue } from '../context/project-context';
import { Project } from '../Project';
import { useHeaderValue } from '../context/header-context';
import { useLayoutValue } from '../context/layout-context';

type Props = {
    activeValue: string
}
export const Projects = (props: Props) => {
    const [active, setActive] = useState(props.activeValue);

    const { setSelectedProject } = useSelectedProjectValue()

    const { projects } = useProjectsValue();

    const { isMobile } = useLayoutValue();
    const { showHeader, setShowHeader } = useHeaderValue();

    return (
        <>
            {projects &&
                projects.map(project => {
                    return <li
                        data-doc-id={project.docId}
                        data-testid="project-action"
                        role="button"
                        key={project.projectId}
                        onKeyDown={() => {
                            setActive(project.projectId);
                            setSelectedProject(project.projectId);
                            if (isMobile) {
                                setShowHeader(false);
                            }
                        }}
                        onClick={() => {
                            setActive(project.projectId);
                            setSelectedProject(project.projectId);
                            if (isMobile) {
                                setShowHeader(false);
                            }
                        }}
                        className={active == project.projectId ? 'active sidebar__project' : 'sidebar__project'}
                    >
                        <Project project={project} key={project.id} />
                    </li>
                })
            } </>
    )
}