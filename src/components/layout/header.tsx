import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';
import { useHeaderValue } from '../../context/header-context';
import { useLayoutValue } from '../../context/layout-context';

type Props = {
    darkMode: boolean,
    setDarkMode: Function,
}

export const Header = (props: Props) => {

    const { darkMode, setDarkMode } = props;
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);
    const { isMobile } = useLayoutValue();
    const { showHeader, setShowHeader } = useHeaderValue();

    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo" onClick={() => {
                    console.log(showHeader);
                    console.log(isMobile);
                    // if (isMobile || !showHeader)
                        setShowHeader(!showHeader)
                }}>
                    <img src="/images/logo.png" alt="Todoist" />
                </div>
                <div className="settings">
                    <ul>
                        <li data-testid="quick-add-task-section" className="settings__add"
                            onClick={() => {
                                setShowQuickAddTask(true)
                            }}
                        >+</li>
                        <li
                            data-testid="dark-mode-action"
                            className="settings_darkmode"
                            onClick={() => setDarkMode(!darkMode)}>
                            <FaPizzaSlice></FaPizzaSlice>
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                showShouldMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            ></AddTask>
        </header>
    )
};