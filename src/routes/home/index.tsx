import { h } from "preact";
import Camera from "../../components/camera";
import { storage } from "../../components/firebase";
import * as style from "./style.css";

interface Props {}

const Home: preact.FunctionalComponent<Props> = props => {
    const blobMe = (blob: Blob|null) => { 
        if(!blob) { return }
        // Create a root reference
        const storageRef = storage.ref();

        // Create a reference to 'mountains.jpg'
        const imageRef = storageRef.child('image.jpg');
        imageRef.put(blob).then(snapshot => {
            console.log('Upload successful!?');
        });
          

    }
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>Take a picture, it'll last longer!</p>
            {/* use as a failover for no media devices? <input type="file" accept="image/*;capture=camera"/>*/}
            <Camera onCapture={blobMe} />
        </div>
    );
};

export default Home;
