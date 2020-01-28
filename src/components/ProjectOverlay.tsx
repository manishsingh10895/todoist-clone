import React from 'react'
import { useProjectsValue } from '../context/project-context';

type Props = {
    setProject: Function,
    showProjectOverlay: boolean,
    setShowProjectOverlay: Function
}

export const ProjectOverlay = (props: Props) => {
    const { setProject, setShowProjectOverlay, showProjectOverlay } = props;

    const { projects } = useProjectsValue();

    return (
        projects &&
        showProjectOverlay && (
            <div className="project-overlay" data-testid="project-overlay">
                <ul className="project-overlay__list">
                    {projects.map(project => (
                        <li key={project.projectId}>
                            <div
                                data-testid="project-overlay-action"
                                onClick={() => {
                                    setProject(project.projectId);
                                    setShowProjectOverlay(false);
                                }}
                                onKeyDown={() => {
                                    setProject(project.projectId);
                                    setShowProjectOverlay(false);
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Select the task project"
                            >
                                {project.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) || null
    );
}