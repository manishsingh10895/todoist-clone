import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

export const useTasks = (selectedProject: any) => {
    const [tasks, setTasks] = useState([] as Task[])

    const [archivedTasks, setArchivedTasks] = useState([] as Task[]);

    useEffect(() => {
        let unsubscribe: any = firebase.firestore()
            .collection('tasks')
            .where('userId', '==', CONFIG.USER_ID);


        unsubscribe = selectedProject && !collatedTasksExist(selectedProject)
            ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
            : selectedProject === 'TODAY' ?
                (unsubscribe = unsubscribe.where(
                    'date', '==', moment().format('DD/MM/YYYY')
                ))
                : selectedProject === 'INBOX' || selectedProject === 0
                    ?
                    (
                        unsubscribe = unsubscribe.where('date', '==', '')
                    )
                    : unsubscribe

        //@ts-ignore
        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks: Task[] = snapshot.docs.map((task: firebase.firestore.QueryDocumentSnapshot) => {
                return {
                    id: task.id,
                    ...task.data()
                } as Task
            })

            console.log(newTasks);

            setTasks(selectedProject === 'NEXT_7' ?
                newTasks.filter(
                    task => {
                        let diff = moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days');

                        return diff > 0 && diff <= 7
                            && task.archived !== true
                    }
                )
                : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== true))
        })

        return () =>
            unsubscribe()
    }, [selectedProject])

    console.log(selectedProject)

    return { tasks, archivedTasks }
}


// NEXT HOST
export const useProjects = () => {
    const [projects, setProjects] = useState([] as Project[])

    useEffect(() => {
        firebase.firestore()
            .collection('projects')
            .where('userId', '==', CONFIG.USER_ID)
            .orderBy('projectId')
            .get()
            .then(snapshot => {

                const allProjects = snapshot.docs.map(project => ({ ...project.data(), docId: project.id })) as Project[];

                console.log(allProjects);

                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            })
    }, [projects])

    return { projects, setProjects }
}