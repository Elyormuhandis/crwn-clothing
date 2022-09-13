import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  // writeBatch,
  query,
  getDocs
} from 'firebase/firestore'



//configuration firebase
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



// add data to firestore
  // export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //   const collectionRef = collection(db, collectionKey);
  //   const batch = writeBatch(db); 

  //   objectsToAdd.forEach((object)=>{
  //     const docRef = doc(collectionRef, object.title.toLowerCase());
  //     batch.set(docRef, object);
  //   });
  //   await batch.commit();
  // };


// get data from firestore
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'catigories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  };


  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation={}
    ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    

    const userSnapshot = await getDoc(userDocRef);

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


  export const signOutUser = async () => {
    await signOut(auth)
  }

  export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);