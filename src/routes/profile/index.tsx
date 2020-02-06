import { FunctionalComponent, h } from "preact";
import User from "../../components/user"
import { useAuth } from "../../hooks/useAuth";
import * as style from "./style.css";

interface Props {
}

const Profile: FunctionalComponent<Props> = props => {
    const {auth} = useAuth()
    return (
        <div class={style.profile}>
        {auth &&  <User {...auth}/>}
        </div>
    );
}

export default Profile;