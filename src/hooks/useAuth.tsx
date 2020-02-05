import { createContext, FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import { useContext, useEffect, useState } from "preact/hooks";
import { PropsWithChildren } from "react";
import { auth as firebaseAuth, googleAuthProvider } from "../components/firebase";
import { ANONYMOUS } from "../constants";
import { User } from "../types";


export const SignIn: FunctionalComponent = () =>
  <Link onClick={() => firebaseAuth.signInWithRedirect(googleAuthProvider)}>
    Login
  </Link>

export const SignOut: FunctionalComponent = () => <Link onClick={() => firebaseAuth.signOut()}>
  Logoff
</Link>

const authContext = createContext(ANONYMOUS);
export const useAuth = () => {
  return useContext(authContext);
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }: PropsWithChildren<{}>) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}




// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(ANONYMOUS);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(u => {
      if(!u) { 
        setUser(ANONYMOUS); 
        return;
      }
      console.log("how many times does this happen?")
      setUser({
        auth:{
          displayName: u.displayName,
          photoURL: u.photoURL,
          uid: u.uid 
        },
        uploads: [] // TODO: fix me with firestore data
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return user;
}
// export function useAuth(requestedMedia: MediaStreamConstraints) {
//   const [mediaStream, setMediaStream] = useState<MediaStream|null>(null);

//   useEffect(() => {
//     if (mediaStream) {
//       // return a cleanup function
//       return () => {
//         mediaStream.getTracks().forEach(track => {
//           track.stop();
//         });
//       }
//     }
//     async function enableStream() {
//       try {
//         const stream: MediaStream = await navigator.mediaDevices.getUserMedia(requestedMedia);
//         setMediaStream(stream);
//       } catch(err) {
//         console.log("something, uh... what?",err)
//         // Removed for brevity
//       }
//     }

//     enableStream();

//   }, [mediaStream, requestedMedia]);

//   return mediaStream;
// }