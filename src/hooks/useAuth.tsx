import { createContext, FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import { useContext, useEffect, useState } from "preact/hooks";
import { PropsWithChildren } from "react";
import { auth as firebaseAuth, googleAuthProvider } from "../components/firebase";
import { ANONYMOUS, EMPTY_USER_DETAIL } from "../constants";
import { userDetail as userDetailRef } from "../state";
import { AuthInfo, UserDetail } from "../types";

export interface ContextType {
  auth: AuthInfo;
  user: UserDetail;
  userRef: firebase.firestore.DocumentReference|null;
}

export const SignIn: FunctionalComponent = () =>
  <Link onClick={() => firebaseAuth.signInWithRedirect(googleAuthProvider)}>
    Login
  </Link>

export const SignOut: FunctionalComponent = () => <Link onClick={() => firebaseAuth.signOut()}>
  Logoff
</Link>

const authContext = createContext<ContextType>({auth: ANONYMOUS, user: EMPTY_USER_DETAIL, userRef: null});
export const useAuth = () => {
  return useContext(authContext);
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }: PropsWithChildren<{}>) {
  const context = useProvideAuth();
  return <authContext.Provider value={context}>{children}</authContext.Provider>;
}




// Provider hook that creates auth object and handles state
function useProvideAuth(): ContextType {
  const [auth, setAuth] = useState(ANONYMOUS);
  const [user, setUser] = useState(EMPTY_USER_DETAIL);
  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference|null>(null);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    let unsubscribeUserDetail = () => {};
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged(u => {
      if(!u) { 
        setAuth(ANONYMOUS); 
        return;
      }
      setUserRef(userDetailRef(u.uid));
      setAuth({
          displayName: u.displayName,
          photoURL: u.photoURL,
          uid: u.uid 
      });
      unsubscribeUserDetail = userDetailRef(u.uid).onSnapshot(doc => {
        if(!doc.data()) {
          userDetailRef(u.uid).set({history: []});
        }
        const userDetail = doc.data() as UserDetail;
        setUser({...userDetail})
      });      
    });


    // Cleanup subscription on unmount
    return () => {
      unsubscribeUserDetail();
      unsubscribeAuth();
    }
  }, []);

  // Return the user object and auth methods
  return {auth, user, userRef};
}
