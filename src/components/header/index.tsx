import { h } from "preact";
import { Link } from "preact-router/match";
import { ANONYMOUS } from "../../constants";
import { SignIn, SignOut, useAuth } from "../../hooks/useAuth";
import * as style from "./style.css";

const Header: preact.FunctionalComponent = () => {
    const {auth} = useAuth();
    const anon = auth === ANONYMOUS;
    return (
        <header class={style.header}>
            <h1>Scrappy Foods!</h1>
            <nav>
                { !anon && <Link activeClassName={style.active} href="/history">
                    History
                </Link> }
                <Link activeClassName={style.active} href="/">
                    Profile
                </Link>
                { anon ? <SignIn/> : <SignOut/> }
            </nav>
        </header>
    );
};

export default Header;
