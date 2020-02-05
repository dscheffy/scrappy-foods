import { FunctionalComponent, h } from "preact";
// import SignIn from "../../components/SignIn"
// import SignOut from "../../components/SignOut"
import User from "../../components/user"
import { ANONYMOUS } from "../../constants";
import { SignIn, SignOut, useAuth } from "../../hooks/useAuth";
import * as style from "./style.css";

interface Props {
}

const Profile: FunctionalComponent<Props> = props => {
    // TODO: ugh, refactor these names, so convoluted...
    const user = useAuth()
    const auth = user.auth;
    const anon = user === ANONYMOUS;
    console.log(user)
    return (
        <div class={style.profile}>
        {user &&  <User {...auth}/>}
        </div>
    );
}

export default Profile;