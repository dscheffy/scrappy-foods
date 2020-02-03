import { h } from "preact";
import Camera from "../../components/camera";
import * as style from "./style.css";

interface Props {}

const Home: preact.FunctionalComponent<Props> = props => {
    const blobMe = (blob: Blob|null) => { 
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
