import { Component, h } from 'preact';
import { AuthInfo } from '../../types';
import * as style from "./style.css";

export default class User extends Component<AuthInfo> {

    public render({ displayName, photoURL }: AuthInfo) {
        return (
          <div>
            <h1>Profile: {displayName}</h1>
              {photoURL && <img alt={displayName || ""} src={photoURL} class={style.avatar} />}
              <p>This is the user profile for a user named {displayName}.</p>
          </div>
        );
    }
}
