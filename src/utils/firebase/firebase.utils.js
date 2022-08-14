import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAp260l9KDFbTE5j7DPaUDgQ1xvKqQ3etg",
    authDomain: "crwn-clothing-db-de493.firebaseapp.com",
    projectId: "crwn-clothing-db-de493",
    storageBucket: "crwn-clothing-db-de493.appspot.com",
    messagingSenderId: "564112790122",
    appId: "1:564112790122:web:57ef8dd1bf23f4e24a7013"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)