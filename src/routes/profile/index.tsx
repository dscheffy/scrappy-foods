import { FunctionalComponent, h } from "preact";
import User from "../../components/user"
import { useCordova } from "../../hooks/cordova";
import { useAuth } from "../../hooks/useAuth";
import * as style from "./style.css";

interface Props {
}

const Profile: FunctionalComponent<Props> = props => {
    const { auth } = useAuth()
    const cordova = useCordova();
    return (
        <div class={style.profile}>
            {auth && <User {...auth} />}
            {cordova && cordova.platformId}
        </div>
    );
}

export default Profile;