import { h } from "preact";
import { Link } from "preact-router/match";
import { ANONYMOUS } from "../../constants";
import { SignIn, SignOut, useAuth } from "../../hooks/useAuth";
import * as style from "./style.css";

const Header: preact.FunctionalComponent = () => {
    const user = useAuth();
    const anon = user === ANONYMOUS;
    return (
        <header class={style.header}>
            <h1>Preact App</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Home
                </Link>
                <Link activeClassName={style.active} href="/profile">
                    Profile
                </Link>
                { anon ? <SignIn/> : <SignOut/> }
            </nav>
        </header>
    );
};

export default Header;
