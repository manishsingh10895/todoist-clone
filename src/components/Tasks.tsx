import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { useSelectedProjectValue } from '../context/selected-project-context';
import { useProjectsValue } from '../context/project-context';
import { collatedTasksExist, getTitle, getCollatedTitle } from '../helpers';
import { collatedTasks } from '../constants';
import { AddTask } from './AddTask';

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks } = useTasks(selectedProject);

    let projectName = '';

    console.log(projects, selectedProject);

    if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        console.log(collatedTasks);
        projectName = getCollatedTitle(collatedTasks, selectedProject).value;
        console.log(projectName);
    }

    useEffect(() => {
        if (projectName)
            document.title = `${projectName}: Todoist`;
        return () => {
            document.title = `Todoist`;
        };
    }, [projectName])


    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>

            <ul className="tasks__list">
                {
                    tasks.map(task => (
                        <li key={task.id}>
                            <Checkbox id={task.id}></Checkbox>
                            {task.task}
                        </li>
                    ))
                }
            </ul>

            <AddTask ></AddTask>
        </div>
    )
}