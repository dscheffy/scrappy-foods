import { h } from "preact";
import Camera from "../../components/camera";
import { FieldValue, storage } from "../../components/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Activity } from "../../types";
import * as style from "./style.css";

interface Props {}

const CameraRoute: preact.FunctionalComponent<Props> = props => {
    const {auth, userRef} = useAuth()
    const handleCapture = (blob: Blob, thumbnail: string) => { 
        const now = new Date().getTime();
        const id = `users/${auth.uid}/${now}.jpg`

        const activity: Activity = {
            type: "picture",
            notes: "",
            timestamp: now,
            image: { id, thumbnail }            
        }
        userRef?.update({history: FieldValue.arrayUnion(activity)})

        const storageRef = storage.ref();
        const imageRef = storageRef.child(id);
        imageRef.put(blob).then(snapshot => {
            console.log('Upload successful!?');
        });
          

    }
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>Take a picture, it'll last longer!</p>
            {/* use as a failover for no media devices? <input type="file" accept="image/*;capture=camera"/>*/}
            <Camera onCapture={handleCapture} />
        </div>
    );
};

export default CameraRoute;
