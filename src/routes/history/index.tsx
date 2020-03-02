import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { FieldValue, storage } from "../../components/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Activity as ActivityType } from "../../types";
import * as style from "./style.css";

type Editable<T> = Partial<T> & {
    onUpdate: (newValue: T) => void;
}

const Activity: FunctionalComponent<ActivityType> = props => {
    const [thumb, setThumb] = useState<any | null>(null);
    if (props.image && !thumb) {
        const thumbnail = props.image.thumbnail;
        // setThumb(<img src={thumbnail}/>)
        const ref = storage.ref(props.image.id);
        ref.getDownloadURL().then(url => {
            setThumb(<a href={url} target="_blank" rel="noopener noreferrer"><img src={thumbnail} /></a>)
        });
    }
    return <li>
        {props.timestamp} {props.type} {props.notes} {thumb}
    </li>
}

const EditActivity: FunctionalComponent<Editable<ActivityType>> = props => {
    const [type, setType] = useState(props.type || "");
    const [notes, setNotes] = useState(props.notes || "")

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.onUpdate({ type, notes, timestamp: props.timestamp || new Date().getTime() })

    }
    const onInput = (e: any, setter: (x: any) => void) => {
        if (e.target && e.target.value) {
            setter(e.target.value)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={type} onInput={e => onInput(e, setType)} />
            <input type="text" value={notes} onInput={e => onInput(e, setNotes)} />
            <button type="submit">Submit</button>
        </form>
    );
}


const History: FunctionalComponent = props => {
    const { user, userRef } = useAuth()
    const newActivity = (activity: ActivityType) => {
        if (userRef) {
            userRef.update({ history: FieldValue.arrayUnion(activity) })
        }
    }
    return (
        <ul class={style.profile}>
            {user.history.map((activity, id) => <Activity key={id} {...activity} />)}
            <EditActivity timestamp={new Date().getTime()} onUpdate={newActivity} />
        </ul>
    );
}

export default History;