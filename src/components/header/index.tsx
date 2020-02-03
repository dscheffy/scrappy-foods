import { h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: preact.FunctionalComponent = () => {
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
            </nav>
        </header>
    );
};

export default Header;
