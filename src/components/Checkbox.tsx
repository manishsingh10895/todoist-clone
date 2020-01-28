import React from 'react';
import { firebase } from '../firebase';

type Props = {
    id: string
}


export const Checkbox = (props: Props) => {
    const archiveTask = () => {
        firebase.firestore()
            .collection('tasks')
            .doc(props.id)
            .update({
                archived: true
            })
    }

    return (
        <div className="checkbox-holder" data-testid="checkbhox-action" onClick={() => archiveTask()}>
            <span className="checkbox"></span>
        </div>
    )
}
