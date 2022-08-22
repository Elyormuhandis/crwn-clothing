import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB3SqypFZonFkqGiC6_mF4uwmu-BTuvKQI",
  authDomain: "crown-clothing-db-b243d.firebaseapp.com",
  projectId: "crown-clothing-db-b243d",
  storageBucket: "crown-clothing-db-b243d.appspot.com",
  messagingSenderId: "849139329206",
  appId: "1:849139329206:web:19a9e4b53aa51128d99e17"
};

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => {signInWithRedirect(auth, googleProvider)}
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation={}
    ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch(error){
        console.log('error creating the user', error.message);
      } 
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email|| !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email|| !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }