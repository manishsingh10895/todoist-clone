import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendar, FaRegCalendarAlt } from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context/selected-project-context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';
import { useHeaderValue } from '../../context/header-context';
import { useLayoutValue } from '../../context/layout-context';



export const Sidebar = () => {

    const { selectedProject, setSelectedProject } = useSelectedProjectValue();

    const [active, setActive] = useState('inbox');

    const [showProjects, setShowProjects] = useState(true);
    const { isMobile } = useLayoutValue();
    const { showHeader, setShowHeader } = useHeaderValue();


    const onClick = (project: string) => {
        setActive(project.toLowerCase());
        setSelectedProject(project.toUpperCase());

        if (isMobile) {
            setShowHeader(false);
        }

        console.log("sidebar click",isMobile, showHeader);
    }

    return <div className={`sidebar ${showHeader ? '' : 'hide'}`} data-testid="sidebar"  >

        <ul className="sidebar__generic">
            <li data-testid="inbox" className="inbox" onClick={() => {
                onClick('inbox')
            }} >

                <FaInbox />

                <span>Inbox</span>
            </li>
            <li data-testid="today" className="today" onClick={() => {
                onClick('today')
            }}>
                <FaRegCalendar />
                <span>Today</span>
            </li>
            <li data-testid="next_7" className="next_7" onClick={() => {
                onClick('next_7')
            }}>
                <FaRegCalendarAlt />
                <span>Next 7 days</span>
            </li>
        </ul>

        <div className="sidebar__middle" onClick={
            () => setShowProjects(!showProjects)
        }>
            <span>
                <FaChevronDown className={!showProjects ? 'hidden-projects' : undefined} />
            </span>
            <h2>Projects</h2>
        </div>

        <ul className="sidebar__projects">
            {showProjects && <Projects activeValue={'index'} />}
        </ul>
        {
            showProjects && <AddProject shouldShow={false} />
        }
    </div >
};