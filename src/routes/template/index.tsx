import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import { useState } from "preact/hooks";
import { FieldValue, storage } from "../../components/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Template as TemplateType } from "../../types";
import * as style from "./style.css";

type Editable<T> = Partial<T> & {
    onUpdate: (newValue: T) => void;
}


const TemplateLink: FunctionalComponent<TemplateType> = props => {
    return <li>
        <Link href={`/template/${props.id}`}>
            {props.title}: {props.description}
        </Link>
    </li>
}

const TemplateDetail: FunctionalComponent<Partial<TemplateType>> = props => {
    return <div>
        <h2>{props.title}</h2>
        <p>
            {props.description}
        </p>
    </div>
}

const EditTemplate: FunctionalComponent<Editable<TemplateType>> = props => {
    const [title, setTitle] = useState(props.title ? props.title : "");
    const [description, setDescription] = useState(props.description || "")
    const [edit, setEdit] = useState(false);
    console.log(title, description)

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.onUpdate({ title, description, id: (props.id || new Date().getTime().toString()), inputs: [] })
        setEdit(false);
    }
    const toggle = (e: any) => {
        e.preventDefault();
        setEdit(!edit);
    }
    const onInput = (e: any, setter: (x: any) => void) => {
        if (e.target && e.target.value) {
            setter(e.target.value)
        }
    }

    return (
        edit ?
            <form onSubmit={onSubmit}>
                <label>Title: </label>
                <input type="text" value={title} onInput={e => onInput(e, setTitle)} />
                <label>Description: </label>
                <input type="text" value={description} onInput={e => onInput(e, setDescription)} />
                <button type="submit">Submit</button>
                <button onClick={toggle}>Cancel</button>
            </form> :
            <div>
                <TemplateDetail {...props} />
                <button onClick={toggle}>Edit</button>
            </div>
    );
}


const TemplateRoute: FunctionalComponent<{ id?: string }> = props => {
    const { user, userRef } = useAuth()
    const newTemplate = (template: TemplateType) => {
        const updates: any = {};
        updates[`templates.${template.id}`] = template;
        if (userRef) {
            userRef.update(updates);
        }
    }
    const templates = user.templates || {};
    if (!props.id) {
        return (

            <ul class={style.profile}>
                {Object.keys(templates).map(id => <TemplateLink key={id} {...(templates[id])} />)}
                <EditTemplate onUpdate={newTemplate} />
            </ul>
        );
    }
    const template = templates[props.id];
    return !template ? <div>"loading..."</div> : <EditTemplate {...templates[props.id]} onUpdate={newTemplate} />
}

export default TemplateRoute;