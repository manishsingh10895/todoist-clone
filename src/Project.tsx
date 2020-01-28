import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { firebase } from './firebase';
import { useProjectsValue } from './context/project-context';
import { useSelectedProjectValue } from './context/selected-project-context';
import { Modal } from './components/layout/Modal';

export const Project = ({ project }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject } = useSelectedProjectValue();

    const deleteProject = docId => {
        firebase
            .firestore()
            .collection('projects')
            .doc(docId)
            .delete()
            .then(() => {
                setProjects([...projects]);
                setSelectedProject('INBOX');
            });
    };

    return (
        <>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">{project.name}</span>
            <span
                className="sidebar__project-delete"
                data-testid="delete-project"
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                tabIndex={0}
                role="button"
                aria-label="Confirm deletion of project"
            >
                <FaTrashAlt />
            </span>
            <Modal show={showConfirm} onClose={() => setShowConfirm(false)} title="Confirmation" description={"Are you sure you want to delete this project?"} actions={[{
                title: 'Delete',
                closeOnClick: true,
                onClick: () => deleteProject(project.docId),
                type: 'negative'
            },
            {
                title: "Cancel",
                onClick: () => setShowConfirm(!showConfirm),
                closeOnClick: true,
                type: 'neutral'
            }]} />
        </>
    );
};